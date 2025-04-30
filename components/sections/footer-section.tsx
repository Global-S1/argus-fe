"use client"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

interface FooterSectionProps {
  currentYear: number
}

export function FooterSection({ currentYear }: FooterSectionProps) {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Argus Logo" width={32} height={32} />
              <span className="text-xl font-bold font-heading text-primary-500 dark:text-primary-400">Argus</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              {language === "es"
                ? "Optimizamos su cadena logística con soluciones a medida que reducen costos y mejoran la eficiencia."
                : "We optimize your logistics chain with tailored solutions that reduce costs and improve efficiency."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/argus-soluciones/?originalSubdomain=pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{content.footer.services}</h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.inventory}
              </button>
              <button
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.digitalization}
              </button>
              <button
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.cataloging}
              </button>
              <button
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.orderProcessing}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{content.footer.usefulLinks}</h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.valueProposition}
              </button>
              <button
                onClick={() => document.getElementById("metodologia")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.methodology}
              </button>
              <button
                onClick={() => document.getElementById("areas")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.expertiseAreas}
              </button>
              <button
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {content.footer.contact}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{content.footer.contactInfo}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === "es"
                ? "Contáctenos para optimizar su cadena logística."
                : "Contact us to optimize your logistics chain."}
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <a
                href="mailto:info@arguslogistics.com"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                info@arguslogistics.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a
                href="tel:+51914734102"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                +51 914 734 102
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} Argus Logistics.{" "}
          {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </div>
      </div>
    </footer>
  )
}
