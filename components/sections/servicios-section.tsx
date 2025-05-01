"use client"

import { motion } from "framer-motion"
import { ClipboardList, FileText, Package, Search, Settings, BarChart } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

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

export function ServiciosSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  const serviceIcons = [ClipboardList, FileText, Package, Search, Settings, BarChart]

  const serviceKeys = ["inventory", "digitalization", "cataloging", "ordering", "consulting", "analysis"]

  return (
    <div className="py-20 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-gray-900/50">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-primary-300 dark:bg-primary-800 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-secondary-300 dark:bg-secondary-800 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 rounded-full mb-2">
            {content.nav.services}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-4">
            {content.services.title}
          </h2>
          <p className="max-w-[800px] text-lg text-gray-600 dark:text-gray-300">{content.services.description}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {serviceKeys.map((key, index) => {
            const Icon = serviceIcons[index]
            return (
              <motion.div key={key} variants={itemVariant}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-white dark:bg-gray-800 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <CardTitle className="text-xl font-bold">{content.services[key].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{content.services[key].description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
