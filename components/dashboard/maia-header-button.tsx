'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SparklesIcon } from 'lucide-react'
import { ChatbotDialog } from './chatbot-dialog'

export function MAIAHeaderButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:text-white"
      >
        <SparklesIcon className="h-4 w-4" />
        MA.IA
      </Button>
      
      {/* Dialog Modal para desktop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col">
            <ChatbotDialog />
          </div>
        </div>
      )}
    </>
  )
}