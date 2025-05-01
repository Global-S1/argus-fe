"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: number
}

interface ChatbotInterfaceProps {
  onClose: () => void
}

export function ChatbotInterface({ onClose }: ChatbotInterfaceProps) {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
}
