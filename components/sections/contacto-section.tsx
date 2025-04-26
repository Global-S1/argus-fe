"use client";

import { useLanguage } from "@/context/language-context";
import { en, es } from "@/lib/content";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactoForm } from "./contacto-form";

export function ContactoSection() {
  const { language } = useLanguage();
  const content = language === "es" ? es : en;

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full mb-2">
                {language === "es" ? "Contáctenos" : "Contact Us"}
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10 pb-2">
                {content.contact.title}
              </h2>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed">
                {content.contact.description}
              </p>
            </div>
            <div className="space-y-4">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-2 mr-3">
                  <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <a
                  href="tel:+51914734102"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  +51 914 734 102
                </a>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-2 mr-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {content.contact.email}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-2 mr-3">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {content.contact.address}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ContactoForm content={content} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
