"use client"

import { motion } from "framer-motion"
import { Settings, TrendingUp, Clock, BarChart2 } from "lucide-react"
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

export function PropuestaValorSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  // Iconos para cada card
  const icons = {
    customManagement: <Settings className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    costOptimization: <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    adaptability: <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    optimizedResults: <BarChart2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full mb-2">
            {language === "es" ? "Propuesta de Valor" : "Value Proposition"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-4">
            {content.valueProposition.title}
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            {content.valueProposition.description}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariant}>
            <div className="flex flex-col items-center space-y-4 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">{icons.customManagement}</div>
              <h3 className="text-xl font-bold">{content.valueProposition.customManagement.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {content.valueProposition.customManagement.description}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariant}>
            <div className="flex flex-col items-center space-y-4 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">{icons.costOptimization}</div>
              <h3 className="text-xl font-bold">{content.valueProposition.costOptimization.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {content.valueProposition.costOptimization.description}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariant}>
            <div className="flex flex-col items-center space-y-4 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">{icons.adaptability}</div>
              <h3 className="text-xl font-bold">{content.valueProposition.adaptability.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {content.valueProposition.adaptability.description}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariant}>
            <div className="flex flex-col items-center space-y-4 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">{icons.optimizedResults}</div>
              <h3 className="text-xl font-bold">{content.valueProposition.optimizedResults.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {content.valueProposition.optimizedResults.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

