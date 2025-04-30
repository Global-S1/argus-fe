"use client"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ChatBubble } from "@/components/chat-bubble"
import { FooterSection } from "@/components/sections/footer-section"
import { AreasEspecializacionSection } from "@/components/sections/areas-especializacion-section"

export default function EspecializacionPage() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar Flotante */}
      <FloatingNavbar />

      <main className="flex-1 pt-20">
        {/* Áreas de Especialización */}
        <AreasEspecializacionSection />
      </main>

      {/* Footer */}
      <FooterSection currentYear={currentYear} />

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}
