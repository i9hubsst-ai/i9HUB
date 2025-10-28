// import { KnowledgeBaseService } from './knowledge-base-service' // Temporariamente desabilitado

interface LlamaConfig {
  temperature?: number
  topP?: number
  context?: number[]
  stream?: boolean
}

interface LlamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context?: number[]
  total_duration?: number
  load_duration?: number
  prompt_eval_duration?: number
}

interface StreamChunk {
  model: string
  created_at: string
  response: string
  done: boolean
}

export class LlamaService {
  private endpoint: string
  private model: string

  private extractTemplateType(prompt: string): string {
    if (prompt.toLowerCase().includes('nr-12') || prompt.toLowerCase().includes('nr12')) {
      return 'NR12'
    }
    if (prompt.toLowerCase().includes('nr-35') || prompt.toLowerCase().includes('nr35')) {
      return 'NR35'
    }
    if (prompt.toLowerCase().includes('iso 45001')) {
      return 'ISO45001'
    }
    if (prompt.toLowerCase().includes('iso 14001')) {
      return 'ISO14001'
    }
    return 'CUSTOM'
  }

  constructor(endpoint = 'http://localhost:11434', model = 'mistral-nemo') {
    this.endpoint = endpoint
    this.model = model
  }

  async generate(prompt: string, config?: LlamaConfig): Promise<string> {
    const startTime = Date.now()
    console.log(`🤖 [${new Date().toISOString()}] [LLAMA] Iniciando geração - START TIME: ${startTime}`)
    console.log(`📝 [${new Date().toISOString()}] [LLAMA] Prompt (${prompt.length} chars):`, prompt.substring(0, 200) + '...')
    console.log(`⚙️ [${new Date().toISOString()}] [LLAMA] Config:`, config)
    
    const fetchStart = Date.now()
    console.log(`🌐 [${new Date().toISOString()}] [LLAMA] Fazendo requisição para ${this.endpoint}/api/generate`)
    
    const response = await fetch(`${this.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: false,
        ...config,
      }),
    })
    
    const fetchEnd = Date.now()
    console.log(`📡 [${new Date().toISOString()}] [LLAMA] Fetch completado em ${fetchEnd - fetchStart}ms - Status: ${response.status}`)

    if (!response.ok) {
      const errorTime = Date.now() - startTime
      console.error(`❌ [${new Date().toISOString()}] [LLAMA] Erro na requisição após ${errorTime}ms: ${response.statusText}`)
      throw new Error(`Erro na requisição Llama: ${response.statusText}`)
    }

    const parseStart = Date.now()
    console.log(`🔍 [${new Date().toISOString()}] [LLAMA] Parseando resposta JSON...`)
    const data = (await response.json()) as LlamaResponse
    const parseEnd = Date.now()
    
    const totalTime = Date.now() - startTime
    console.log(`✅ [${new Date().toISOString()}] [LLAMA] GERAÇÃO COMPLETA - Total: ${totalTime}ms | Fetch: ${fetchEnd - fetchStart}ms | Parse: ${parseEnd - parseStart}ms`)
    console.log(`📄 [${new Date().toISOString()}] [LLAMA] Resposta (${data.response?.length || 0} chars):`, data.response?.substring(0, 200) + '...')
    
    if (data.total_duration) {
      console.log(`⏱️ [${new Date().toISOString()}] [LLAMA] Duração interna do Ollama: ${data.total_duration / 1000000}ms`)
    }
    
    return data.response
  }

  async *streamGenerate(prompt: string, config?: LlamaConfig): AsyncGenerator<string> {
    const response = await fetch(`${this.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: true,
        ...config,
      }),
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição Llama: ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('Response body is null')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(Boolean)

        for (const line of lines) {
          const data = JSON.parse(line) as StreamChunk
          yield data.response
          if (data.done) break
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  // Helper para gerar sugestões de template com contexto específico
  async generateTemplateSuggestions(prompt: string, context?: string): Promise<string> {
    // const kb = KnowledgeBaseService.getInstance() // Temporariamente desabilitado
    
    const systemPrompt = `Você é um especialista em Segurança e Saúde do Trabalho.
    
    CONTEXTO: ${context || 'Não fornecido'}
    
    // Contexto será fornecido dinamicamente
    
    ${context ? `Contexto adicional: ${context}` : ''}`

    return this.generate(`${systemPrompt}\n\n${prompt}`, {
      temperature: 0.7,
      topP: 0.9,
    })
  }

  // Helper para gerar sugestões de plano de ação
  async generateActionPlanSuggestions(
    findings: string,
    context?: string
  ): Promise<string> {
    const systemPrompt = `Você é um especialista em Segurança e Saúde do Trabalho.
    Analise as não-conformidades encontradas e sugira ações corretivas práticas e efetivas.
    Considere a viabilidade técnica e econômica das sugestões.
    ${context ? `Contexto adicional: ${context}` : ''}`

    return this.generate(`${systemPrompt}\n\nNão-conformidades encontradas:\n${findings}`, {
      temperature: 0.7,
      topP: 0.9,
    })
  }
}

// Instância singleton do serviço
export const llamaService = new LlamaService()