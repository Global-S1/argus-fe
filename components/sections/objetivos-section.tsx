"use client"

import { motion } from "framer-motion"
import { Target, AlertTriangle, Clock, Users, Zap, BarChart2 } from "lucide-react"
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

export function ObjetivosSection() {
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
            {language === "es" ? "Nuestros Objetivos" : "Our Objectives"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-2">
            {language === "es" ? "Objetivos de Nuestra Consultoría" : "Our Consulting Objectives"}
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            {language === "es"
              ? "Trabajamos con metas claras para optimizar su cadena logística"
              : "We work with clear goals to optimize your logistics chain"}
          </p>
        </motion.div>

        {/* Objetivo General */}
        <motion.div
          className="mx-auto max-w-4xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Target className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">
                  {language === "es" ? "Objetivo General" : "General Objective"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "es"
                    ? '"Realizar un diagnóstico integral que permita identificar oportunidades de mejora en la cadena logística, optimizando los tiempos, incrementando la eficiencia en los procesos y reduciendo los costos operativos."'
                    : '"Conduct a comprehensive diagnosis to identify improvement opportunities in the logistics chain, optimizing times, increasing process efficiency, and reducing operating costs."'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Objetivos Específicos - Centrados cuando no completan el grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariant}
            whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 w-full"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {language === "es" ? "Identificar cuellos de botella" : "Identify bottlenecks"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Identificar cuellos de botella en la cadena logística que afectan la eficiencia operativa."
                  : "Identify bottlenecks in the logistics chain that affect operational efficiency."}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariant}
            whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 w-full"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {language === "es" ? "Evaluar procesos logísticos" : "Evaluate logistics processes"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Evaluar los diferentes procesos logísticos, para reducir tiempos y costos operativos."
                  : "Evaluate the different logistics processes to reduce times and operating costs."}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariant}
            whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 w-full"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {language === "es" ? "Evaluar capacidades" : "Evaluate capabilities"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Evaluar las capacidades actuales de las áreas que soportan la operación logística."
                  : "Evaluate the current capabilities of the areas that support the logistics operation."}
              </p>
            </div>
          </motion.div>

          {/* Contenedor para centrar el segundo renglón */}
          <div className="lg:col-span-3 flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:max-w-[66%]">
              <motion.div
                variants={itemVariant}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 w-full"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <Zap className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {language === "es" ? "Proponer herramientas tecnológicas" : "Propose technological tools"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === "es"
                      ? "Evaluar y proponer herramientas tecnológicas que automaticen y agilicen procesos."
                      : "Evaluate and propose technological tools that automate and streamline processes."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariant}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 w-full"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <BarChart2 className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{language === "es" ? "Proponer KPIs" : "Propose KPIs"}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === "es"
                      ? "Proponer indicadores de desempeño (KPIs) para monitorear mejoras en la cadena logística."
                      : "Propose key performance indicators (KPIs) to monitor improvements in the logistics chain."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
