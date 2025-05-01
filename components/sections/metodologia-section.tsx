"use client"

import { motion } from "framer-motion"
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

export function MetodologiaSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 rounded-full mb-2">
            {language === "es" ? "Metodología" : "Methodology"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-4">
            {content.methodology.title}
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            {content.methodology.description}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-5xl mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={itemVariant} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">{content.methodology.diagnosis.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.methodology.diagnosis.description}</p>
            </motion.div>

            <motion.div variants={itemVariant} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E07A35] text-white shadow-lg">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">{content.methodology.solutionDesign.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.methodology.solutionDesign.description}</p>
            </motion.div>

            <motion.div variants={itemVariant} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5E9BD3] text-white shadow-lg">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">{content.methodology.resultsProposal.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.methodology.resultsProposal.description}</p>
            </motion.div>

            <motion.div variants={itemVariant} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500 text-white shadow-lg">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold">{content.methodology.results.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.methodology.results.description}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
