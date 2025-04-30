"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
// Asegurar que las importaciones del servicio de email sean correctas
// Reemplazar la importación actual por:
import { sendMail } from "@/service/email/email.service"

// Interfaz para el estado del formulario
interface FormState {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

// Interfaz para los errores de validación
interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  message?: string
}

export function ContactoSection() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en

  // Estados para el formulario
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.firstName.trim()) {
      newErrors.firstName = language === "es" ? "El nombre es requerido" : "First name is required"
    }

    if (!formState.lastName.trim()) {
      newErrors.lastName = language === "es" ? "El apellido es requerido" : "Last name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = language === "es" ? "El email es requerido" : "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = language === "es" ? "Email inválido" : "Invalid email format"
    }

    if (!formState.company.trim()) {
      newErrors.company = language === "es" ? "La empresa es requerida" : "Company is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = language === "es" ? "El mensaje es requerido" : "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await sendMail({
        name: formState.firstName,
        lastname: formState.lastName,
        to: formState.email,
        company: formState.company,
        text: formState.message,
      })

      setSubmitStatus("success")
      // Resetear el formulario después de un envío exitoso
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Resetear el estado de envío
  const resetSubmitStatus = () => {
    setSubmitStatus("idle")
  }

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
                <span className="text-gray-600 dark:text-gray-300">{content.contact.email}</span>
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
                <span className="text-gray-600 dark:text-gray-300">{content.contact.address}</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4 rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-lg relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Overlay de éxito o error */}
            {submitStatus !== "idle" && (
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex flex-col items-center justify-center z-10 rounded-xl">
                {submitStatus === "success" ? (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {language === "es" ? "¡Mensaje enviado!" : "Message sent!"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {language === "es"
                        ? "Gracias por contactarnos. Nos pondremos en contacto contigo pronto."
                        : "Thank you for contacting us. We will get back to you soon."}
                    </p>
                    <Button onClick={resetSubmitStatus}>{language === "es" ? "Cerrar" : "Close"}</Button>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {language === "es" ? "Error al enviar" : "Error sending message"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {language === "es"
                        ? "Ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo."
                        : "There was an error sending your message. Please try again."}
                    </p>
                    <Button onClick={resetSubmitStatus}>{language === "es" ? "Intentar de nuevo" : "Try again"}</Button>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                  >
                    {content.contact.form.firstName}
                  </label>
                  <input
                    id="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border ${
                      errors.firstName ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder={content.contact.form.placeholder.firstName}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                  >
                    {content.contact.form.lastName}
                  </label>
                  <input
                    id="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border ${
                      errors.lastName ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder={content.contact.form.placeholder.lastName}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  {content.contact.form.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`flex h-10 w-full rounded-md border ${
                    errors.email ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  placeholder={content.contact.form.placeholder.email}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  {content.contact.form.company}
                </label>
                <input
                  id="company"
                  value={formState.company}
                  onChange={handleChange}
                  className={`flex h-10 w-full rounded-md border ${
                    errors.company ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  placeholder={content.contact.form.placeholder.company}
                />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  {content.contact.form.message}
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={`flex min-h-[120px] w-full rounded-md border ${
                    errors.message ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  placeholder={content.contact.form.placeholder.message}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === "es" ? "Enviando..." : "Sending..."}
                  </>
                ) : (
                  content.contact.form.submit
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
