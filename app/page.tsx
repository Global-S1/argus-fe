"use client"

import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroSection } from "@/components/hero-section"
import { ChatBubble } from "@/components/chat-bubble"
// Importar secciones
import { QuienesSomosSection } from "@/components/sections/quienes-somos-section"
import { PropuestaValorSection } from "@/components/sections/propuesta-valor-section"
import { ObjetivosSection } from "@/components/sections/objetivos-section"
import { MetodologiaSection } from "@/components/sections/metodologia-section"
import { EquipoTrabajoSection } from "@/components/sections/equipo-trabajo-section"
import { ContactoSection } from "@/components/sections/contacto-section"
import { FooterSection } from "@/components/sections/footer-section"

// Variantes para animaciones
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function Home() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const [scrollY, setScrollY] = useState(0)
  const currentYear = new Date().getFullYear()
  const contactRef = useRef<HTMLElement>(null)

  // Definir los elementos de navegación
  const navItems = [
    { label: "Quiénes Somos", href: "quienes-somos" },
    { label: "Objetivos", href: "objetivos" },
    { label: "Propuesta", href: "propuesta" },
    { label: "Metodología", href: "metodologia" },
    { label: "Equipo", href: "equipo" },
    { label: "Contacto", href: "contacto" },
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

    // Track scroll position for animations
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar Flotante */}
      <FloatingNavbar items={navItems} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Quiénes Somos */}
        <section id="quienes-somos">
          <QuienesSomosSection />
        </section>

        {/* Objetivos */}
        <section id="objetivos">
          <ObjetivosSection />
        </section>

        {/* Propuesta de Valor */}
        <section id="propuesta">
          <PropuestaValorSection />
        </section>

        {/* Metodología */}
        <section id="metodologia">
          <MetodologiaSection />
        </section>

        {/* Equipo de Trabajo */}
        <section id="equipo">
          <EquipoTrabajoSection />
        </section>

        {/* Contacto */}
        <section id="contacto" ref={contactRef}>
          <ContactoSection />
        </section>
      </main>

      {/* Footer */}
      <FooterSection currentYear={currentYear} />

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}
