"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, ChevronDown, Users, Briefcase, Package, Award, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

interface FloatingNavbarProps {
  mobileBreakpoint?: number
}

export function FloatingNavbar({ mobileBreakpoint = 1024 }: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Estructura del menú agrupado
  const navItems: NavItem[] = [
    {
      label: "Nosotros",
      href: "#",
      icon: <Users className="h-4 w-4" />,
      children: [
        { label: "Quiénes Somos", href: "quienes-somos" },
        { label: "Nuestros Objetivos", href: "objetivos" },
        { label: "Nuestro Equipo", href: "equipo" },
        { label: "Propuesta de Valor", href: "propuesta" },
        { label: "Metodología", href: "metodologia" },
      ],
    },
    {
      label: "Servicios",
      href: "servicios",
      icon: <Package className="h-4 w-4" />,
      children: [
        { label: "Nuestros Servicios", href: "servicios" },
        { label: "Requisitos", href: "informacion-requerida" },
        { label: "Resultados", href: "entregables" },
      ],
    },
    {
      label: "Especialización",
      href: "areas",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      label: "Colaboraciones",
      href: "clientes",
      icon: <Award className="h-4 w-4" />,
    },
    {
      label: "Contáctenos",
      href: "contacto",
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detectar tamaño de pantalla para mostrar versión móvil o desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    handleResize() // Ejecutar al inicio
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileBreakpoint])

  // Función para manejar el hover en el dropdown
  const handleDropdownHover = (itemLabel: string | null, isHovering: boolean) => {
    // Limpiar cualquier timeout existente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (isHovering) {
      // Si está entrando al dropdown, activarlo inmediatamente
      setActiveDropdown(itemLabel)
      setIsHoveringDropdown(true)
      setShowOverlay(true)
    } else {
      // Si está saliendo, establecer un timeout para desactivar el dropdown
      setIsHoveringDropdown(false)

      // Aplicar delay de 0.5 segundos antes de cerrar el dropdown
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null)
        setShowOverlay(false)
      }, 500)
    }
  }

  // Función para manejar el scroll suave a las secciones
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    setIsHoveringDropdown(false)
    setShowOverlay(false)

    // Pequeño retraso para asegurar que el menú móvil se cierre primero
    setTimeout(() => {
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
    }, 100)
  }

  // Renderizar items del menú móvil - ahora mostrando todas las opciones sin necesidad de expandir
  const renderMobileMenuItems = (items: NavItem[]) => {
    return (
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            {/* Título de la sección */}
            <div className="font-bold text-lg text-primary-600 dark:text-primary-400 flex items-center gap-2 px-2">
              {item.icon}
              {item.label}
            </div>

            {/* Opciones de la sección */}
            <div className="space-y-1 ml-6">
              {item.children ? (
                item.children.map((child, childIndex) => (
                  <Button
                    key={childIndex}
                    variant="ghost"
                    className="w-full justify-start text-base py-2"
                    onClick={() => scrollToSection(child.href)}
                  >
                    {child.label}
                  </Button>
                ))
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base py-2"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Variantes para la animación del dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "py-4 bg-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 z-50"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <Image
              src="/logo.png"
              alt="Argus Logo"
              width={36}
              height={36}
              className={cn("transition-all duration-300", isScrolled ? "w-8 h-8" : "w-9 h-9")}
            />
            <span
              className={cn(
                "font-bold font-heading text-primary-500 transition-all duration-300",
                isScrolled ? "text-xl" : "text-2xl",
              )}
            >
              Argus
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2" ref={dropdownRef}>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleDropdownHover(item.label, true)}
                  onMouseLeave={() => handleDropdownHover(item.label, false)}
                >
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                    onClick={() => (item.children ? null : scrollToSection(item.href))}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </Button>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                      >
                        <div className="py-1">
                          {item.children.map((child, childIndex) => (
                            <button
                              key={childIndex}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => scrollToSection(child.href)}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          )}

          {/* Right Side Items */}
          <div className="flex items-center gap-2 z-50">
            <ThemeToggle />
            <LanguageSwitcher />

            {!isMobile && (
              <Link href="/consulta">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  Solicitar Consulta
                </Button>
              </Link>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Overlay oscuro cuando se despliega un dropdown */}
      <AnimatePresence>
        {!isMobile && showOverlay && (
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white dark:bg-gray-900 flex flex-col pt-24 px-6 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-6">{renderMobileMenuItems(navItems)}</nav>
            <Link href="/consulta" className="mt-8">
              <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                Solicitar Consulta
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

