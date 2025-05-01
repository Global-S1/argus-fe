"use client"

import { useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ChatBubble } from "@/components/chat-bubble"
import { FooterSection } from "@/components/sections/footer-section"
import { ServiciosSection } from "@/components/sections/servicios-section"
import { InformacionRequeridaSection } from "@/components/sections/informacion-requerida-section"
import { EntregablesSection } from "@/components/sections/entregables-section"

export default function ServiciosPage() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const currentYear = new Date().getFullYear()

  // Definir los elementos de navegación para esta página
  const navItems = [
    { label: "Servicios", href: "servicios" },
    { label: "Información Requerida", href: "informacion-requerida" },
    { label: "Entregables", href: "entregables" },
  ]

  // Smooth scroll to section when clicking on nav links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100)
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar Flotante */}
      <FloatingNavbar items={navItems} />

      <main className="flex-1 pt-20">
        {/* Servicios */}
        <section id="servicios">
          <ServiciosSection />
        </section>

        {/* Información Requerida */}
        <section id="informacion-requerida">
          <InformacionRequeridaSection />
        </section>

        {/* Entregables */}
        <section id="entregables">
          <EntregablesSection />
        </section>
      </main>

      {/* Footer */}
      <FooterSection currentYear={currentYear} />

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}
