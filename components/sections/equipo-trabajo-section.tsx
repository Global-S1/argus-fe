"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Users, Briefcase, FileText, Lightbulb, TrendingUp, Award } from "lucide-react"
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

export function EquipoTrabajoSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const pathname = usePathname()

  // Don't render on the main page
  if (pathname === "/") {
    return null
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full mb-2">
            {content.team.title}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10">
            {content.team.title}
          </h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
            {content.team.description}
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Mapa mental / Red de equipo */}
          <div className="flex justify-center mb-12">
            <motion.div
              className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 border-4 border-primary-500 flex items-center justify-center shadow-xl z-20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Award className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Líneas de conexión */}
            <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-primary-200 dark:bg-primary-800 -translate-x-1/2 -translate-y-12"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-primary-200 dark:bg-primary-800 md:block hidden"></div>
            <div className="absolute top-0 left-1/4 w-0.5 h-6 bg-primary-200 dark:bg-primary-800 md:block hidden"></div>
            <div className="absolute top-0 right-1/4 w-0.5 h-6 bg-primary-200 dark:bg-primary-800 md:block hidden"></div>

            {/* Líder de Proyecto */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{content.team.projectLeader}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{content.team.projectLeaderDesc}</p>
            </motion.div>

            {/* Coordinador de Proyecto */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{content.team.projectCoordinator}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{content.team.projectCoordinatorDesc}</p>
            </motion.div>

            {/* Equipo de levantamiento de información */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{content.team.informationTeam}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{content.team.informationTeamDesc}</p>
            </motion.div>

            {/* Analistas de procesos */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{content.team.processAnalysts}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{content.team.processAnalystsDesc}</p>
            </motion.div>
          </div>

          {/* Equipo Consultor */}
          <div className="flex justify-center mt-12">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{content.team.consultingTeam}</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.team.consultingTeamDesc}</p>
            </motion.div>
          </div>
          {/* Línea de conexión */}
          <div className="absolute bottom-1/2 left-1/2 w-0.5 h-12 bg-primary-200 dark:bg-primary-800 -translate-x-1/2 translate-y-6"></div>
        </motion.div>
      </div>
    </div>
  )
}
