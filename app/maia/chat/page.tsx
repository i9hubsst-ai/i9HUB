'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Bot, User, Sparkles, ArrowLeft, Info } from 'lucide-react'
import { getLeadSession, type LeadSession } from '@/lib/services/lead-session'

export default function MaiaChatPage() {
  const router = useRouter()
  const [session, setSession] = useState<LeadSession | null>(null)
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  // Verificar sessão ao carregar
  useEffect(() => {
    const currentSession = getLeadSession()
    
    if (!currentSession) {
      // Redirecionar para landing se não tiver sessão
      router.push('/maia#cadastro')
      return
    }

    setSession(currentSession)
    loadChatHistory(currentSession)
  }, [router])

  // Carregar histórico de mensagens
  const loadChatHistory = async (sessionData: LeadSession) => {
    try {
      const response = await fetch(`/api/maia/chat?leadId=${sessionData.leadId}`)
      const data = await response.json()

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })))
      } else {
        // Mensagem de boas-vindas inicial
        setMessages([{
          role: 'assistant',
          content: `Olá ${sessionData.name?.split(' ')[0] || ''}! Eu sou o MA.IA, seu assistente de Inteligência Artificial especializado em Segurança e Saúde do Trabalho. Como posso ajudá-lo hoje?`
        }])
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      setMessages([{
        role: 'assistant',
        content: 'Olá! Eu sou o MA.IA. Como posso ajudá-lo hoje?'
      }])
    } finally {
      setIsLoadingHistory(false)
    }
  }

  // Salvar mensagem no banco
  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!session) return

    try {
      await fetch('/api/maia/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: session.leadId,
          role,
          content
        })
      })
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !session) return

    const userMessage = input.trim()
    setInput('')
    
    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    // Salvar mensagem do usuário
    await saveMessage('user', userMessage)
    
    setIsLoading(true)

    try {
      // TODO: Integrar com API do chat MA.IA real
      // Por enquanto, resposta simulada
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const assistantMessage = `Esta é uma versão de demonstração do MA.IA. A integração com a IA completa será ativada em breve. Por enquanto, você pode explorar a interface.\n\nSua pergunta foi: "${userMessage}"`
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }])
      
      // Salvar resposta do assistente
      await saveMessage('assistant', assistantMessage)
    } catch (error) {
      const errorMessage = 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }])
      await saveMessage('assistant', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu histórico...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Vai redirecionar
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/maia">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  MA.IA
                </h1>
                <p className="text-xs text-gray-600">Módulo Avançado de IA</p>
              </div>
            </div>
          </div>

          <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Versão Gratuita
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-6 max-w-7xl mx-auto flex flex-col">
        <div className="max-w-5xl w-full mx-auto flex flex-col flex-1">
          {/* Aviso de Versão de Teste */}
          <Card className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-900">
                <strong>Versão de Pré-Lançamento:</strong> Você está testando a interface do MA.IA. 
                A integração completa com a base de conhecimento de SST será ativada em breve. 
                Por enquanto, explore a interface e familiarize-se com o chat!
              </div>
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="mb-6 flex-1 p-6 overflow-y-auto bg-white shadow-xl border-2 border-gray-200">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-md ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-tl-none'
                  }`}>
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start animate-fade-in">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-none px-6 py-4 shadow-md">
                    <div className="flex gap-2">
                      <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce"></span>
                      <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta sobre SST..."
              className="flex-1 min-h-[70px] max-h-[140px] resize-none text-base border-2 border-green-200 focus:border-green-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-[70px] px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-3">
            Pressione Enter para enviar ou Shift+Enter para nova linha
          </p>
        </div>
      </main>
    </div>
  )
}
