import { GoogleGenAI } from '@google/genai'

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

export class GeminiService {
  async generateTemplateSuggestions(prompt: string, context?: any): Promise<string> {
    const systemPrompt = `Você é um especialista em Segurança e Saúde do Trabalho. 
Analise o contexto fornecido e gere sugestões para templates de auditoria/diagnóstico.
Responda em formato JSON com array de sugestões.

Contexto: ${JSON.stringify(context)}
Prompt: ${prompt}`

    const response = await genai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }]
    })

    return response.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }

  async generateActionPlanSuggestions(findings: any[], context?: any): Promise<string> {
    const systemPrompt = `Você é um especialista em Segurança e Saúde do Trabalho.
Analise os achados fornecidos e gere sugestões de plano de ação.
Responda em formato JSON com array de ações recomendadas.

Achados: ${JSON.stringify(findings)}
Contexto: ${JSON.stringify(context)}`

    const response = await genai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }]
    })

    return response.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }

  async generate(prompt: string): Promise<string> {
    const response = await genai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })

    return response.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }
}

export const geminiService = new GeminiService()