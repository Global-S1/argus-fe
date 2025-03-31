"use client"

import { motion } from "framer-motion"
import { GitBranch, Layers, FileCheck, Zap, Workflow } from "lucide-react"

// Variantes para animaciones
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function EntregablesSection() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 rounded-full mb-2">
            Resultados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10">
            Entregables de la Consultoría
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            Documentos y análisis que recibirá al finalizar nuestro servicio
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Línea de tiempo horizontal */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Entregable 1 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 dark:border-primary-400 flex items-center justify-center mb-4 shadow-lg">
                <GitBranch className="h-8 w-8 text-primary-500 dark:text-primary-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full">
                <h3 className="font-bold text-lg mb-2">Flujogramas de Procesos Críticos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mapeo detallado de los procesos clave en almacenamiento, transporte y distribución.
                </p>
              </div>
            </motion.div>

            {/* Entregable 2 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-secondary-500 dark:border-secondary-400 flex items-center justify-center mb-4 shadow-lg">
                <Layers className="h-8 w-8 text-secondary-500 dark:text-secondary-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full">
                <h3 className="font-bold text-lg mb-2">Análisis de Brechas Tecnológicas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Evaluación del nivel de digitalización en los procesos logísticos y oportunidades de mejora.
                </p>
              </div>
            </motion.div>

            {/* Entregable 3 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 dark:border-primary-400 flex items-center justify-center mb-4 shadow-lg">
                <FileCheck className="h-8 w-8 text-primary-500 dark:text-primary-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full">
                <h3 className="font-bold text-lg mb-2">Informe de Hallazgos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Evaluación de costos logísticos y diagnóstico de la gestión de inventarios y niveles de stock.
                </p>
              </div>
            </motion.div>

            {/* Entregable 4 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-secondary-500 dark:border-secondary-400 flex items-center justify-center mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-secondary-500 dark:text-secondary-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full">
                <h3 className="font-bold text-lg mb-2">Informe de Quick Wins</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Acciones de implementación rápida con alto impacto en eficiencia y reducción de costos.
                </p>
              </div>
            </motion.div>

            {/* Entregable 5 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 dark:border-primary-400 flex items-center justify-center mb-4 shadow-lg">
                <Workflow className="h-8 w-8 text-primary-500 dark:text-primary-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full">
                <h3 className="font-bold text-lg mb-2">Roadmap de Implementación</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Plan detallado con fases de implementación y KPIs para monitorear avances.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

