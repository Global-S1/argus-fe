"use client"

import { motion } from "framer-motion"
import { Briefcase, BarChart, Users, Handshake, ChevronRight, Lock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

export function InformacionRequeridaSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

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
            {language === "es" ? "Requisitos" : "Requirements"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-4">
            {language === "es" ? "Información Requerida del Cliente" : "Required Client Information"}
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            {language === "es"
              ? "Para realizar un diagnóstico efectivo, necesitamos acceso a información clave"
              : "To perform an effective diagnosis, we need access to key information"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-10 bg-white dark:bg-gray-800 rounded-lg p-4 border border-primary-200 dark:border-primary-800 shadow-md"
        >
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
            <Lock className="h-5 w-5" />
            <p className="font-medium">
              {language === "es"
                ? "Se firmará acuerdo de confidencialidad para tratamiento de datos."
                : "A confidentiality agreement will be signed for data processing."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="w-full">
            <motion.div variants={itemVariant}>
              <AccordionItem
                value="item-1"
                className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="font-bold text-lg">
                      {language === "es"
                        ? "Información Operativa y Logística"
                        : "Operational and Logistics Information"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Flujo de procesos logísticos actuales."
                          : "Current logistics process flow."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Indicadores clave de desempeño (KPIs)."
                          : "Key performance indicators (KPIs)."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Histórico de ventas y proyección de demanda."
                          : "Sales history and demand projection."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es" ? "Capacidad y estado del almacén." : "Warehouse capacity and status."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Políticas de inventarios y abastecimiento."
                          : "Inventory and supply policies."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es" ? "Estrategias y costos de transporte." : "Transport strategies and costs."}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariant}>
              <AccordionItem
                value="item-2"
                className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <span className="font-bold text-lg">
                      {language === "es"
                        ? "Información Financiera y Presupuestaria"
                        : "Financial and Budgetary Information"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-secondary-500 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Costos logísticos: almacenamiento, transporte, distribución y manejo de inventarios."
                          : "Logistics costs: storage, transportation, distribution, and inventory management."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-secondary-500 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Presupuesto disponible para implementar mejoras en tecnología, infraestructura o procesos."
                          : "Available budget to implement improvements in technology, infrastructure, or processes."}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariant}>
              <AccordionItem
                value="item-3"
                className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="font-bold text-lg">
                      {language === "es"
                        ? "Acceso a Personal Clave y Recursos"
                        : "Access to Key Personnel and Resources"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Disponibilidad de entrevistas con líderes y equipos clave de logística, ventas y operaciones."
                          : "Availability for interviews with key leaders and teams in logistics, sales, and operations."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Acceso a sistemas de información (ERP, WMS, TMS) para análisis de datos logísticos."
                          : "Access to information systems (ERP, WMS, TMS) for logistics data analysis."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Permisos para visitas y observación en almacenes y centros de distribución."
                          : "Permissions for visits and observation in warehouses and distribution centers."}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariant}>
              <AccordionItem
                value="item-4"
                className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                      <Handshake className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <span className="font-bold text-lg">
                      {language === "es" ? "Compromiso del Cliente" : "Client Commitment"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-secondary-500 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Designación de un responsable interno para coordinar el proyecto y facilitar la recopilación de información."
                          : "Designation of an internal person responsible for coordinating the project and facilitating information gathering."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-secondary-500 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === "es"
                          ? "Apertura a recomendaciones y cambios operativos en función de los hallazgos del diagnóstico."
                          : "Openness to recommendations and operational changes based on diagnostic findings."}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}

