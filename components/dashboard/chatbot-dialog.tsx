'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useChat } from 'ai/react'
import { BotIcon, SendIcon, XIcon, SparklesIcon, ThumbsUp, ThumbsDown } from 'lucide-react'

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Record<number, 'positive' | 'negative' | null>>({})
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Função para enviar feedback
  const handleFeedback = async (messageIndex: number, feedback: 'positive' | 'negative') => {
    try {
      setFeedbacks(prev => ({ ...prev, [messageIndex]: feedback }))
      
      const message = messages[messageIndex]
      const userMessage = messageIndex > 0 ? messages[messageIndex - 1] : null
      
      await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage?.content || '',
          answer: message.content,
          feedback,
        })
      })
    } catch (error) {
      console.error('Erro ao enviar feedback:', error)
      setFeedbacks(prev => ({ ...prev, [messageIndex]: null }))
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        size="icon"
      >
        <SparklesIcon className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className={`fixed z-50 shadow-2xl ${
      isMobile 
        ? 'inset-4 w-auto h-auto' // Mobile: quase fullscreen com margem pequena
        : 'bottom-6 right-6 w-[420px] h-[650px]' // Desktop: tamanho fixo
    } p-0 flex flex-col overflow-hidden bg-white dark:bg-gray-900 border-2`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">MA.IA</h3>
            <p className="text-xs opacity-90">Assistente Especializado em SST</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <SparklesIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Olá! Eu sou a MA.IA</p>
              <p className="text-sm">Sua assistente especializada em Segurança e Saúde do Trabalho</p>
              <p className="text-xs mt-2">Faça uma pergunta sobre NRs, normas ou SST!</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === 'assistant' ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`rounded-2xl p-3 max-w-[85%] ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}
              >
                {message.role === 'assistant' && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    MA.IA
                  </Badge>
                )}
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
              
              {/* Botões de feedback apenas para mensagens do assistente */}
              {message.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-muted-foreground">Útil?</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 p-0 ${
                      feedbacks[index] === 'positive' 
                        ? 'bg-green-100 hover:bg-green-200 text-green-700' 
                        : 'hover:bg-green-50 hover:text-green-600'
                    }`}
                    onClick={() => handleFeedback(index, 'positive')}
                    disabled={!!feedbacks[index]}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 p-0 ${
                      feedbacks[index] === 'negative' 
                        ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                        : 'hover:bg-red-50 hover:text-red-600'
                    }`}
                    onClick={() => handleFeedback(index, 'negative')}
                    disabled={!!feedbacks[index]}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                  {feedbacks[index] && (
                    <span className="text-[10px] text-green-600 font-medium ml-1">
                      Obrigado!
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          {/* Elemento invisível para scroll automático */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
        <form onSubmit={handleFormSubmit} className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Pergunte sobre SST, NRs, normas..."
            disabled={isLoading}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleFormSubmit(e as any)
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-[60px] w-12"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Enter para enviar • Shift+Enter para nova linha
        </p>
      </div>
    </Card>
  )
}
