"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export interface Client {
  id: number
  name: string
  image: string
}

interface InfiniteCarouselProps {
  clients: Client[]
  title?: string
  description?: string
}

export function InfiniteCarousel({
  clients,
  title = "Nuestros Clientes",
  description = "Empresas que confían en nuestros servicios",
}: InfiniteCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const { theme } = useTheme()
  const carouselRef = useRef<HTMLDivElement>(null)
  const currentPositionRef = useRef<number>(0)

  // Duplicar clientes para efecto infinito
  const duplicatedClients = [...clients, ...clients]

  useEffect(() => {
    if (!carouselRef.current) return

    const scrollWidth = carouselRef.current.scrollWidth
    const clientWidth = carouselRef.current.clientWidth

    let animationId: number
    let lastTimestamp: number | null = null

    const animate = (timestamp: number) => {
      if (isPaused) {
        lastTimestamp = timestamp
        animationId = requestAnimationFrame(animate)
        return
      }

      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      // Velocidad de desplazamiento (aumentada para un movimiento más rápido)
      const speed = 0.4
      currentPositionRef.current = (currentPositionRef.current + speed) % (scrollWidth / 2)

      if (carouselRef.current) {
        carouselRef.current.scrollLeft = currentPositionRef.current

        // Reiniciar cuando llegue a la mitad (donde comienza la duplicación)
        if (currentPositionRef.current >= scrollWidth / 2) {
          currentPositionRef.current = 0
          carouselRef.current.scrollLeft = 0
        }
      }

      lastTimestamp = timestamp
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused, clients.length])

  return (
    <div className="w-full overflow-hidden py-12 md:py-16 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6 mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full mb-2">
            Colaboraciones
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent pb-2">
            {title}
          </h2>
          <p className="max-w-[900px] mx-auto text-gray-600 dark:text-gray-300 md:text-xl/relaxed">{description}</p>
        </motion.div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-hidden whitespace-nowrap py-8 transition-all duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            className="inline-flex flex-col items-center mx-2 sm:mx-4 md:mx-6 lg:mx-8 transition-transform duration-300 hover:scale-105"
            style={{ minWidth: "150px", maxWidth: "200px" }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <Image src={client.image || "/placeholder.svg"} alt={client.name} fill className="object-contain p-2" />
            </div>
            {/* Eliminado el nombre del cliente para mostrar solo los logos */}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
