"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBubble() {
  // Ocultar el chat temporalmente - cambiar a true cuando se quiera habilitar en el futuro
  const CHAT_ENABLED = false

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showTimeout, setShowTimeout] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  // Preguntas frecuentes
  const commonQuestions =
    language === "es"
      ? [
          "¿Qué servicios ofrecen?",
          "¿Cómo puedo solicitar una consulta?",
          "¿Trabajan con empresas pequeñas?",
          "¿Cuánto tiempo toma implementar sus soluciones?",
        ]
      : [
          "What services do you offer?",
          "How can I request a consultation?",
          "Do you work with small businesses?",
          "How long does it take to implement your solutions?",
        ]

  // Respuestas a preguntas frecuentes
  const getResponseForQuestion = (question: string): string => {
    if (language === "es") {
      switch (question) {
        case "¿Qué servicios ofrecen?":
          return "Ofrecemos servicios de inventario físico, digitalización, catalogación, ordenamiento, consultoría logística y análisis de procesos."
        case "¿Cómo puedo solicitar una consulta?":
          return "Puede solicitar una consulta a través de nuestro formulario en línea, llamándonos al +51 123 456 789 o enviando un correo a contacto@argus.com."
        case "¿Trabajan con empresas pequeñas?":
          return "Sí, trabajamos con empresas de todos los tamaños, adaptando nuestras soluciones a sus necesidades específicas."
        case "¿Cuánto tiempo toma implementar sus soluciones?":
          return "El tiempo de implementación varía según la complejidad del proyecto, pero generalmente va desde 1 mes hasta 6 meses."
        default:
          return "Gracias por su mensaje. Un representante se pondrá en contacto con usted pronto."
      }
    } else {
      switch (question) {
        case "What services do you offer?":
          return "We offer physical inventory, digitalization, cataloging, ordering, logistics consulting, and process analysis services."
        case "How can I request a consultation?":
          return "You can request a consultation through our online form, by calling us at +51 123 456 789, or by sending an email to contact@argus.com."
        case "Do you work with small businesses?":
          return "Yes, we work with businesses of all sizes, adapting our solutions to your specific needs."
        case "How long does it take to implement your solutions?":
          return "Implementation time varies depending on project complexity, but generally ranges from 1 month to 6 months."
        default:
          return "Thank you for your message. A representative will contact you soon."
      }
    }
  }

  // Cargar mensajes del localStorage al iniciar
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convertir las cadenas de fecha a objetos Date
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error("Error parsing saved messages:", error)
      }
    } else {
      // Mensaje de bienvenida
      const welcomeMessage = {
        id: "welcome",
        text: language === "es" ? "¡Hola! ¿En qué podemos ayudarte hoy?" : "Hello! How can we help you today?",
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [language])

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mostrar timeout después de 3 mensajes del usuario
  useEffect(() => {
    const userMessages = messages.filter((msg) => msg.sender === "user")
    if (userMessages.length >= 3 && !showTimeout) {
      setTimeout(() => {
        setShowTimeout(true)
      }, 1000)
    }
  }, [messages, showTimeout])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getResponseForQuestion(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleQuestionClick = (question: string) => {
    // Agregar la pregunta como mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: question,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getResponseForQuestion(question),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const clearChat = () => {
    localStorage.removeItem("chatMessages")
    const welcomeMessage = {
      id: "welcome",
      text: language === "es" ? "¡Hola! ¿En qué podemos ayudarte hoy?" : "Hello! How can we help you today?",
      sender: "bot" as const,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setShowTimeout(false)
  }

  return CHAT_ENABLED ? (
    <>
      {/* Botón flotante */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {/* Encabezado del chat */}
            <div className="bg-primary-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="mr-2" size={20} />
                <h3 className="font-medium">{language === "es" ? "Chat de Soporte" : "Support Chat"}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={language === "es" ? "Limpiar chat" : "Clear chat"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={language === "es" ? "Cerrar chat" : "Close chat"}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {showTimeout ? (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-400">
                    {language === "es" ? "¿Necesitas ayuda inmediata?" : "Need immediate assistance?"}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {language === "es"
                      ? "Contáctanos directamente para una respuesta más rápida:"
                      : "Contact us directly for a faster response:"}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{content.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{content.contact.email}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-primary-500 hover:bg-primary-600"
                    onClick={() => setShowTimeout(false)}
                  >
                    {language === "es" ? "Continuar en el chat" : "Continue in chat"}
                  </Button>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary-500 text-white"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-primary-100" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />

                  {/* Preguntas frecuentes */}
                  {messages.length < 3 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {language === "es" ? "Preguntas frecuentes:" : "Frequently asked questions:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {commonQuestions.map((question, index) => (
                          <button
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300 transition-colors"
                            onClick={() => handleQuestionClick(question)}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input para mensaje */}
            {!showTimeout && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={language === "es" ? "Escribe un mensaje..." : "Type a message..."}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ""}
                    className="bg-primary-500 text-white p-2 rounded-r-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : null
}
