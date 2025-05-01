"use client"

import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ChatBubble } from "@/components/chat-bubble"
import { FooterSection } from "@/components/sections/footer-section"
import { QuienesSomosSection } from "@/components/sections/quienes-somos-section"
import { EquipoTrabajoSection } from "@/components/sections/equipo-trabajo-section"

export default function NosotrosPage() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const currentYear = new Date().getFullYear()

  // Definir los elementos de navegación para esta página
  const navItems = [
    { label: "Quiénes Somos", href: "quienes-somos" },
    { label: "Equipo de Trabajo", href: "equipo-trabajo" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar Flotante */}
      <FloatingNavbar items={navItems} />

      <main className="flex-1 pt-20">
        {/* Quiénes Somos */}
        <section id="quienes-somos">
          <QuienesSomosSection />
        </section>

        {/* Equipo de Trabajo */}
        <section id="equipo-trabajo">
          <EquipoTrabajoSection />
        </section>
      </main>

      {/* Footer */}
      <FooterSection currentYear={currentYear} />

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}
