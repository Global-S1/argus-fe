"use client"

import { useState, useEffect } from "react"
import { X, Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatbotInterface } from "@/components/chatbot-interface"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewMessages, setHasNewMessages] = useState(false)

  // Verificar si hay mensajes guardados al cargar
  useEffect(() => {
    const chatHistory = localStorage.getItem("argus-chat-history")
    if (chatHistory) {
      const messages = JSON.parse(chatHistory)
      if (messages.length > 0) {
        setHasNewMessages(true)
      }
    }
  }, [])

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat"
      >
        {/* Ícono de robot con micrófono */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
          <Mic className="absolute -top-1 -right-2 h-4 w-4" />
        </div>
        {hasNewMessages && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <div className="relative w-full h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="absolute top-2 right-2 z-10">
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ChatbotInterface onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

