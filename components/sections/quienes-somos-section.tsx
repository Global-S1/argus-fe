"use client"

import { motion } from "framer-motion"
import { Compass, Eye } from "lucide-react"
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

export function QuienesSomosSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  return (
    <div className="py-20 md:py-32 relative overflow-hidden">
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
            {language === "es" ? "Nuestra Identidad" : "Our Identity"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-4">
            {language === "es" ? "Quiénes Somos" : "Who We Are"}
          </h2>
          <p className="max-w-[800px] text-lg text-gray-600 dark:text-gray-300">
            {language === "es"
              ? "Somos un equipo de profesionales con amplia trayectoria profesional en gestión Logística que busca brindar soluciones a la medida de las necesidades de las empresas."
              : "We are a team of professionals with extensive experience in Logistics management that seeks to provide tailored solutions to meet the needs of companies."}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariant}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Compass className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold">{language === "es" ? "Misión" : "Mission"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Brindar soluciones ágiles y eficientes con un asesoramiento profesional y el mejor recurso humano."
                  : "Provide agile and efficient solutions with professional advice and the best human resources."}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariant}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold">{language === "es" ? "Visión" : "Vision"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Ser una empresa líder en soluciones logísticas siempre de la mano de la innovación y con el apoyo de tecnologías de vanguardia."
                  : "To be a leading company in logistics solutions always hand in hand with innovation and with the support of cutting-edge technologies."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

