import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from '@ai-sdk/react'
import { BotIcon, SendIcon, XIcon } from 'lucide-react'

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  const { messages, status, sendMessage } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ 
          type: 'text',
          text: 'Olá! Sou o assistente de Segurança do Trabalho. Como posso ajudar você hoje?'
        }]
      }
    ]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput('')
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
      >
        <BotIcon className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] h-[600px] p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BotIcon className="h-6 w-6" />
          <h3 className="font-semibold">Assistente SST</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.parts.map((part, index) => (
                  part.type === 'text' && <span key={index}>{part.text}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem..."
          disabled={status !== 'ready'}
        />
        <Button type="submit" disabled={status !== 'ready'}>
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  )
}