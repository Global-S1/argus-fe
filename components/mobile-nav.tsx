"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  Package,
  CheckCircle,
  Mail,
  Users,
  Briefcase,
  Award,
  Target,
  FileText,
  FileCheck,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  useEffect(() => {
    // Bloquear scroll cuando el menú está abierto
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (id: string) => {
    closeMenu()
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[350px] pr-0 dark:bg-gray-900">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Image src="/logo.png" alt="Argus Logo" width={32} height={32} className="mr-2" />
            <span className="text-lg font-bold">Argus</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-7">
          <div className="flex flex-col space-y-4">
            <Link
              href="#quienes-somos"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-5 w-5" />
              Quiénes Somos
            </Link>
            <Link
              href="#servicios"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Package className="h-5 w-5" />
              Servicios
            </Link>
            <Link
              href="#propuesta"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <CheckCircle className="h-5 w-5" />
              Propuesta de Valor
            </Link>
            <Link
              href="#objetivos"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Target className="h-5 w-5" />
              Objetivos
            </Link>
            <Link
              href="#areas"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="h-5 w-5" />
              Áreas de Especialización
            </Link>
            <Link
              href="#metodologia"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <GitBranch className="h-5 w-5" />
              Metodología
            </Link>
            <Link
              href="#informacion-requerida"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Información Requerida
            </Link>
            <Link
              href="#entregables"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <FileCheck className="h-5 w-5" />
              Entregables
            </Link>
            <Link
              href="#equipo"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-5 w-5" />
              Equipo de Trabajo
            </Link>
            <Link
              href="#clientes"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Award className="h-5 w-5" />
              Clientes
            </Link>
            <Link
              href="#contacto"
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-5 w-5" />
              Contacto
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

