"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

export function HeroSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [bubbles, setBubbles] = useState<
    {
      size: string
      distance: string
      position: string
      time: string
      delay: string
    }[]
  >([])

  // Textos dinámicos relacionados con logística
  const dynamicTexts = [
    "Optimizando cadenas de suministro globales",
    "Transformando la logística empresarial",
    "Soluciones de inventario a gran escala",
    "Eficiencia en cada eslabón logístico",
    "Digitalización de procesos logísticos",
  ]

  // Detectar tamaño de pantalla para ocultar imagen en móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Ocultar en pantallas menores a md
    }
    handleResize() // Ejecutar al inicio
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Cambiar el texto cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length)
        setIsAnimating(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Función para manejar la navegación
  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("/")) {
      window.location.href = sectionId
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      // Calcular la posición considerando el navbar
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const newBubbles = [...Array(10)].map(() => ({
      size: `${Math.random() * 4 + 2}rem`,
      distance: `${Math.random() * 4 + 3}rem`,
      position: `${Math.random() * 100}%`,
      time: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 2}s`,
    }))

    setBubbles(newBubbles)
  }, [])

  return (
    <section className="relative flex items-stretch py-8 md:py-16 lg:py-20 overflow-hidden min-h-[700px] mt-16 md:mt-0">
      {/* Fondo dinámico con CSS puro */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-75 sm:opacity-90" />

        {/* Burbujas animadas */}
        <div className="bubbles">
          {bubbles.map((bubble, i) => (
            <div
              key={i}
              className="bubble"
              style={
                {
                  "--size": bubble.size,
                  "--distance": bubble.distance,
                  "--position": bubble.position,
                  "--time": bubble.time,
                  "--delay": bubble.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center min-h-[500px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white">
                {content.hero.title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">{content.hero.description}</p>
            </div>

            {/* Texto dinámico con animación */}
            <div className="h-12 flex items-center overflow-hidden my-4">
              <motion.p
                className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: isAnimating ? 0 : 1,
                  y: isAnimating ? -20 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {dynamicTexts[currentTextIndex]}
              </motion.p>
            </div>

            {/* Actualizar los botones para que redirijan a las páginas correspondientes */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                onClick={() => scrollToSection("/servicios")}
              >
                {content.hero.learnMore}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("contacto")}
              >
                {content.hero.contact}
              </Button>
            </div>
          </motion.div>

          {/* Imagen del trabajador con sombra mejorada - visible en todas las pantallas */}
          <motion.div
            className="flex items-end justify-center lg:justify-end h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[320px] sm:h-[400px] md:h-[450px] lg:h-full w-full">
              <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="relative h-full w-full flex items-end justify-center">
                <Image
                  src="/trabajador-argus.png"
                  alt="Trabajador logístico con equipo de seguridad y casco amarillo"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl filter"
                  priority
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg flex items-center gap-1 sm:gap-2 hover:bg-primary-600 transition-colors cursor-pointer">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Soluciones optimizadas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
