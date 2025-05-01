"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Client {
  id: number
  name: string
  image: string
}

interface ClientCarouselProps {
  clients: Client[]
  title?: string
  description?: string
}

export function ClientCarousel({
  clients,
  title = "Nuestros Clientes",
  description = "Empresas que confían en nuestros servicios",
}: ClientCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleClients, setVisibleClients] = useState<Client[]>([])
  const [itemsPerView, setItemsPerView] = useState(4)

  // Determine how many items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update visible clients when currentIndex or itemsPerView changes
  useEffect(() => {
    const endIndex = Math.min(currentIndex + itemsPerView, clients.length)
    setVisibleClients(clients.slice(currentIndex, endIndex))
  }, [currentIndex, itemsPerView, clients])

  const nextSlide = useCallback(() => {
    if (currentIndex + itemsPerView < clients.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }, [currentIndex, itemsPerView, clients.length])

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    } else {
      setCurrentIndex(Math.max(0, clients.length - itemsPerView)) // Loop to end
    }
  }, [currentIndex, clients.length, itemsPerView])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10 rounded-full bg-white/80 hover:bg-white shadow-md"
            onClick={prevSlide}
            aria-label="Anterior cliente"
          >
            <ChevronLeft className="h-6 w-6 text-primary-800" />
          </Button>

          <div className="flex gap-4 overflow-hidden px-12">
            {visibleClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out"
                style={{ minWidth: `calc(100% / ${itemsPerView})` }}
              >
                <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-white p-2 shadow-sm">
                  <Image
                    src={client.image || "/placeholder.svg"}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="text-center font-medium text-primary-800">{client.name}</h3>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10 rounded-full bg-white/80 hover:bg-white shadow-md"
            onClick={nextSlide}
            aria-label="Siguiente cliente"
          >
            <ChevronRight className="h-6 w-6 text-primary-800" />
          </Button>
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: Math.ceil(clients.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                Math.floor(currentIndex / itemsPerView) === index ? "bg-primary-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
