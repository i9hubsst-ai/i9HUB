'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Bot, User, Sparkles, ArrowLeft, Info } from 'lucide-react'

export default function MaiaChatPage() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: 'Olá! Eu sou o MA.IA, seu assistente de Inteligência Artificial especializado em Segurança e Saúde do Trabalho. Como posso ajudá-lo hoje?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // TODO: Integrar com API do chat MA.IA real
      // Por enquanto, resposta simulada
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Esta é uma versão de demonstração do MA.IA. A integração com a IA completa será ativada em breve. Por enquanto, você pode explorar a interface.\n\nSua pergunta foi: "${userMessage}"`
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/maia">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
      <main className="container px-4 py-8 max-w-5xl">
        {/* Aviso de Versão de Teste */}
        <Card className="mb-6 p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>Versão de Pré-Lançamento:</strong> Você está testando a interface do MA.IA. 
              A integração completa com a base de conhecimento de SST será ativada em breve. 
              Por enquanto, explore a interface e familiarize-se com o chat!
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6 p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
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
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
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
            className="h-[60px] px-6 bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Pressione Enter para enviar ou Shift+Enter para nova linha
        </p>
      </main>
    </div>
  )
}
