"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { AIChat } from "./ai-chat"

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="default" 
          className="flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-5 w-5" />
          <span>Assistente IA</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <SheetTitle className="px-6 pt-6">Assistente de IA</SheetTitle>
        <AIChat />
      </SheetContent>
    </Sheet>
  )
}
