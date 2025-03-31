"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, MessageCircleQuestion, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const presetQuestions = [
    "¿Qué servicios ofrecen?",
    "¿Cómo puedo solicitar una consulta?",
    "¿Cuánto tiempo toma implementar sus soluciones?",
    "¿Trabajan con empresas pequeñas?",
  ]

  // Cargar mensajes del localStorage al iniciar
  useEffect(() => {
    const savedMessages = localStorage.getItem("argus-chat-history")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Mensaje de bienvenida
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "¡Hola! Soy el asistente virtual de Argus. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: Date.now(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("argus-chat-history", JSON.stringify(messages))
    }
  }, [messages])

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Configurar temporizador de inactividad
  useEffect(() => {
    // Limpiar temporizador existente
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    // Configurar nuevo temporizador (1 minuto)
    const timer = setTimeout(() => {
      if (messages.length > 0 && !showContactInfo) {
        setShowContactInfo(true)
      }
    }, 60000)

    setInactivityTimer(timer)

    // Limpiar al desmontar
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer)
      }
    }
  }, [messages, showContactInfo])

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    const timer = setTimeout(() => {
      if (messages.length > 0 && !showContactInfo) {
        setShowContactInfo(true)
      }
    }, 60000)

    setInactivityTimer(timer)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Resetear temporizador de inactividad
    resetInactivityTimer()

    // Ocultar información de contacto si está visible
    if (showContactInfo) {
      setShowContactInfo(false)
    }

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handlePresetQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("servicio") || lowerMessage.includes("ofrecen")) {
      return "Ofrecemos servicios de inventario físico, digitalización, catalogación, ordenamiento, consultoría y análisis. Puedes ver más detalles en la sección de Servicios de nuestra página web."
    } else if (lowerMessage.includes("consulta") || lowerMessage.includes("contactar")) {
      return "Puedes solicitar una consulta personalizada a través del formulario en nuestra página web, en la sección 'Solicitar Consulta', o contactándonos directamente por teléfono o email."
    } else if (lowerMessage.includes("tiempo") || lowerMessage.includes("implementar")) {
      return "El tiempo de implementación varía según la complejidad del proyecto. Generalmente, nuestras soluciones pueden implementarse en un plazo de 1 a 3 meses. Podemos darte un estimado más preciso después de una consulta inicial."
    } else if (lowerMessage.includes("pequeñas") || lowerMessage.includes("tamaño")) {
      return "Sí, trabajamos con empresas de todos los tamaños. Nuestras soluciones son escalables y se adaptan a las necesidades específicas de cada cliente, desde pequeñas empresas hasta grandes corporaciones."
    } else if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("tarifa")) {
      return "Nuestros precios varían según el alcance y la complejidad del proyecto. Ofrecemos presupuestos personalizados después de entender tus necesidades específicas. ¿Te gustaría que un representante te contacte para discutir tu proyecto?"
    } else if (lowerMessage.includes("ubicación") || lowerMessage.includes("donde")) {
      return "Estamos ubicados en Lima, Perú, pero ofrecemos servicios a nivel nacional e internacional. Podemos trabajar de forma remota o presencial según las necesidades del proyecto."
    } else {
      return "Gracias por tu mensaje. Para obtener información más detallada, te recomendamos contactar directamente con nuestro equipo a través del formulario de contacto o llamando al número que aparece en nuestra página web."
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-500 text-white">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Asistente Argus</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">¿Necesitas ayuda personalizada?</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Contáctanos directamente:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Email:</span>
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {content.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Teléfono:</span>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {content.contact.phone}
                  </a>
                </div>
              </div>
              <div className="mt-3">
                <Link href="/consulta" onClick={onClose}>
                  <Button variant="outline" size="sm" className="w-full">
                    Solicitar consulta <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-2">
          {presetQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={() => handlePresetQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            onClick={handleSendMessage}
            className="rounded-full bg-primary-500 hover:bg-primary-600 text-white p-2 w-10 h-10 flex items-center justify-center"
            disabled={inputValue.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

