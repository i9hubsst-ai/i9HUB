"use client"

import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Send, User, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react"
import { useChat } from "ai/react"

import type { Message } from 'ai'

// Chave para localStorage
const CHAT_STORAGE_KEY = 'i9hub_ai_chat_messages'

export function AIChat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [feedbacks, setFeedbacks] = useState<Record<number, 'positive' | 'negative' | null>>({})

  // Carregar mensagens do localStorage na inicialização
  const loadMessagesFromStorage = (): Message[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        console.log('💾 [CHAT] Mensagens carregadas do localStorage:', parsed.length)
        return parsed
      }
    } catch (error) {
      console.error('❌ [CHAT] Erro ao carregar mensagens:', error)
    }
    return []
  }

  // Salvar mensagens no localStorage
  const saveMessagesToStorage = (messages: Message[]) => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
      console.log('💾 [CHAT] Mensagens salvas no localStorage:', messages.length)
    } catch (error) {
      console.error('❌ [CHAT] Erro ao salvar mensagens:', error)
    }
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/ai/chat",
    headers: {
      'Content-Type': 'application/json',
    },
    onError: (error) => {
      console.error('❌ [CHAT] Erro no useChat:', error)
    },
    onFinish: (message) => {
      console.log('✅ [CHAT] Mensagem finalizada:', message)
    }
  })

  // Carregar mensagens do localStorage após inicialização
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage()
    if (savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [setMessages])

  // Salvar mensagens sempre que mudarem
  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage(messages)
    }
  }, [messages])

  // Função para limpar chat
  const clearChat = () => {
    setMessages([])
    setFeedbacks({})
    localStorage.removeItem(CHAT_STORAGE_KEY)
    console.log('🗑️ [CHAT] Chat limpo e localStorage removido')
  }

  // Função para enviar feedback
  const handleFeedback = async (messageIndex: number, feedback: 'positive' | 'negative') => {
    const message = messages[messageIndex]
    if (!message || message.role !== 'assistant') return

    try {
      setFeedbacks(prev => ({ ...prev, [messageIndex]: feedback }))
      
      console.log(`${feedback === 'positive' ? '👍' : '👎'} [FEEDBACK] Enviando feedback para mensagem ${messageIndex}`)
      
      // Envia feedback para o backend
      await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: `chat_${Date.now()}_${messageIndex}`,
          userQuery: messageIndex > 0 ? messages[messageIndex - 1]?.content : '',
          aiResponse: message.content,
          feedback,
          timestamp: new Date().toISOString()
        })
      })

      console.log(`✅ [FEEDBACK] Feedback ${feedback} enviado com sucesso`)
    } catch (error) {
      console.error('❌ [FEEDBACK] Erro ao enviar feedback:', error)
      // Reverte o estado em caso de erro
      setFeedbacks(prev => ({ ...prev, [messageIndex]: null }))
    }
  }

  // Ajusta altura do textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [input])

  // Scroll para última mensagem
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Card className="flex h-[600px] flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">Assistente SST</h3>
          {messages.length > 0 && (
            <span className="text-sm text-muted-foreground">
              ({messages.length} mensagens)
            </span>
          )}
        </div>
        
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Limpar Chat
          </Button>
        )}
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Olá! Como posso ajudar?</h3>
              <p className="text-muted-foreground">
                Faça perguntas sobre Segurança e Saúde do Trabalho, normas regulamentadoras, equipamentos de proteção e muito mais.
              </p>
            </div>
          </div>
        )}

        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.role === "assistant" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              {message.role === "assistant" ? (
                <Bot className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className={`flex flex-col gap-2 max-w-[80%]`}>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-background border"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
              
              {/* Botões de feedback apenas para mensagens do assistente */}
              {message.role === 'assistant' && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">Esta resposta foi útil?</span>
                  <Button
                    variant={feedbacks[index] === 'positive' ? 'default' : 'ghost'}
                    size="sm"
                    className={`h-7 w-7 p-0 ${
                      feedbacks[index] === 'positive' 
                        ? 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300' 
                        : 'hover:bg-green-50 hover:text-green-600'
                    }`}
                    onClick={() => handleFeedback(index, 'positive')}
                    disabled={!!feedbacks[index]}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={feedbacks[index] === 'negative' ? 'default' : 'ghost'}
                    size="sm"
                    className={`h-7 w-7 p-0 ${
                      feedbacks[index] === 'negative' 
                        ? 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300' 
                        : 'hover:bg-red-50 hover:text-red-600'
                    }`}
                    onClick={() => handleFeedback(index, 'negative')}
                    disabled={!!feedbacks[index]}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                  {feedbacks[index] && (
                    <span className="text-xs text-green-600 font-medium">
                      Obrigado pelo feedback!
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Digite sua pergunta sobre SST..."
          className="min-h-[44px] max-h-[200px] resize-none"
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e as any)
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </Card>
  )
}