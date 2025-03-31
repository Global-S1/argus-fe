"use client"

import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroSection } from "@/components/hero-section"
import { ChatBubble } from "@/components/chat-bubble"
import { InfiniteCarousel } from "@/components/infinite-carousel"

// Importar secciones
import { QuienesSomosSection } from "@/components/sections/quienes-somos-section"
import { ServiciosSection } from "@/components/sections/servicios-section"
import { PropuestaValorSection } from "@/components/sections/propuesta-valor-section"
import { ObjetivosSection } from "@/components/sections/objetivos-section"
import { AreasEspecializacionSection } from "@/components/sections/areas-especializacion-section"
import { MetodologiaSection } from "@/components/sections/metodologia-section"
import { InformacionRequeridaSection } from "@/components/sections/informacion-requerida-section"
import { EntregablesSection } from "@/components/sections/entregables-section"
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
  const serviciosRef = useRef<HTMLElement>(null)

  // Definir los elementos de navegación
  const navItems = [
    { label: "Quiénes Somos", href: "quienes-somos" },
    { label: "Servicios", href: "servicios" },
    { label: "Propuesta", href: "propuesta" },
    { label: "Objetivos", href: "objetivos" },
    { label: "Áreas", href: "areas" },
    { label: "Metodología", href: "metodologia" },
    { label: "Contacto", href: "contacto" },
  ]

  // Datos de clientes para el carrusel
  const clients = [
    { id: 1, name: "AESA", image: "/customers/AESA.png" },
    { id: 2, name: "Ángeles Solest", image: "/customers/Angeles-Solest.png" },
    { id: 3, name: "EQUANS", image: "/customers/EQUANS.png" },
    { id: 4, name: "Alfa Co", image: "/customers/Alfa-Co.png" },
    { id: 5, name: "Inchcape", image: "/customers/Inchcape.webp" },
    { id: 6, name: "GM", image: "/customers/GM.png" },
    { id: 7, name: "INCIMMET", image: "/customers/INCIMMET.jpg" },
    { id: 8, name: "Molitalia", image: "/customers/Molitalia.png" },
    { id: 9, name: "Telefonica", image: "/customers/Telefonica.jpg" },
    { id: 10, name: "Quicksa", image: "/customers/Quicksa.webp" },
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

  const scrollToServicios = () => {
    serviciosRef.current?.scrollIntoView({ behavior: "smooth" })
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

        {/* Servicios */}
        <section id="servicios">
          <ServiciosSection />
        </section>

        {/* Propuesta de Valor */}
        <section id="propuesta">
          <PropuestaValorSection />
        </section>

        {/* Objetivos */}
        <section id="objetivos">
          <ObjetivosSection />
        </section>

        {/* Áreas de Especialización */}
        <section id="areas">
          <AreasEspecializacionSection />
        </section>

        {/* Metodología */}
        <section id="metodologia">
          <MetodologiaSection />
        </section>

        {/* Información Requerida */}
        <section id="informacion-requerida">
          <InformacionRequeridaSection />
        </section>

        {/* Entregables */}
        <section id="entregables">
          <EntregablesSection />
        </section>

        {/* Equipo de Trabajo */}
        <section id="equipo">
          <EquipoTrabajoSection />
        </section>

        {/* Clientes */}
        <section id="clientes">
          <InfiniteCarousel clients={clients} title={content.clients.title} description={content.clients.description} />
        </section>

        {/* Contacto */}
        <section id="contacto">
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

