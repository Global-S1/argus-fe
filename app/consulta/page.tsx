"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/context/language-context";
import { es, en } from "@/lib/content";
import { sendMail } from "@/service/email/email.service";
import { FooterSection } from "@/components/sections/footer-section";

// Interfaz para el estado del formulario
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  companyName: string;
  industry: string;
  employees: string;
  address: string;
  city: string;
  country: string;
  projectType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  additionalInfo: string;
}

// Interfaz para los errores de validación
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  projectDescription?: string;
  [key: string]: string | undefined;
}

export default function ConsultationPage() {
  const { language } = useLanguage();
  const content = language === "es" ? es : en;
  const [activeTab, setActiveTab] = useState("personal");
  const currentYear = new Date().getFullYear();

  // Estados para el formulario
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    companyName: "",
    industry: "",
    employees: "",
    address: "",
    city: "",
    country: "",
    projectType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // Manejar cambios en los campos de selección
  const handleSelectChange = (id: string, value: string) => {
    setFormState((prev) => ({ ...prev, [id]: value }));

    // Limpiar error cuando el usuario selecciona un valor
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleNextTab = (current: string, next: string) => {
    // Validar campos del tab actual antes de avanzar
    let isValid = true;
    const newErrors: FormErrors = {};

    if (current === "personal") {
      if (!formState.firstName.trim()) {
        newErrors.firstName =
          language === "es"
            ? "El nombre es requerido"
            : "First name is required";
        isValid = false;
      }

      if (!formState.lastName.trim()) {
        newErrors.lastName =
          language === "es"
            ? "El apellido es requerido"
            : "Last name is required";
        isValid = false;
      }

      if (!formState.email.trim()) {
        newErrors.email =
          language === "es" ? "El email es requerido" : "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
        newErrors.email =
          language === "es" ? "Email inválido" : "Invalid email format";
        isValid = false;
      }
    } else if (current === "company") {
      if (!formState.companyName.trim()) {
        newErrors.companyName =
          language === "es"
            ? "El nombre de la empresa es requerido"
            : "Company name is required";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setActiveTab(next);
    }
  };

  const handlePrevTab = (current: string, prev: string) => {
    setActiveTab(prev);
  };

  // Validar el formulario completo
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar campos obligatorios
    if (!formState.firstName.trim()) {
      newErrors.firstName =
        language === "es" ? "El nombre es requerido" : "First name is required";
    }

    if (!formState.lastName.trim()) {
      newErrors.lastName =
        language === "es"
          ? "El apellido es requerido"
          : "Last name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email =
        language === "es" ? "El email es requerido" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email =
        language === "es" ? "Email inválido" : "Invalid email format";
    }

    if (!formState.companyName.trim()) {
      newErrors.companyName =
        language === "es"
          ? "El nombre de la empresa es requerido"
          : "Company name is required";
    }

    if (!formState.projectDescription.trim()) {
      newErrors.projectDescription =
        language === "es"
          ? "La descripción del proyecto es requerida"
          : "Project description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Crear un mensaje completo con todos los detalles del formulario
      const fullMessage = `
Tipo de Proyecto: ${formState.projectType}
Teléfono: ${formState.phone}
Cargo: ${formState.position}
Industria: ${formState.industry}
Empleados: ${formState.employees}
Dirección: ${formState.address}
Ciudad: ${formState.city}
País: ${formState.country}
Presupuesto: ${formState.budget}
Plazo: ${formState.timeline}
Información Adicional: ${formState.additionalInfo}
Descripción del Proyecto: ${formState.projectDescription}
      `;

      await sendMail({
        name: formState.firstName,
        lastname: formState.lastName,
        to: formState.email,
        company: formState.companyName,
        text: fullMessage,
      });

      setSubmitStatus("success");
      // Resetear el formulario después de un envío exitoso
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        companyName: "",
        industry: "",
        employees: "",
        address: "",
        city: "",
        country: "",
        projectType: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear el estado de envío
  const resetSubmitStatus = () => {
    setSubmitStatus("idle");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Argus Logo"
                width={32}
                height={32}
                className="animate-pulse-slow"
              />
              <span className="text-xl font-bold font-heading text-primary-500">
                Argus
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          </div>
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full mb-4">
                Consulta Personalizada
              </span>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2 font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {content.consultation.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 md:text-xl">
                {content.consultation.description}
              </p>
            </motion.div>

            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden relative">
              {/* Overlay de éxito o error */}
              {submitStatus !== "idle" && (
                <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex flex-col items-center justify-center z-10 rounded-xl">
                  {submitStatus === "success" ? (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {language === "es"
                          ? "¡Solicitud enviada!"
                          : "Request sent!"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {language === "es"
                          ? "Gracias por tu solicitud. Nos pondremos en contacto contigo pronto para discutir tu proyecto."
                          : "Thank you for your request. We will contact you soon to discuss your project."}
                      </p>
                      <Button onClick={resetSubmitStatus}>
                        {language === "es" ? "Cerrar" : "Close"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {language === "es"
                          ? "Error al enviar"
                          : "Error sending request"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {language === "es"
                          ? "Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo."
                          : "There was an error sending your request. Please try again."}
                      </p>
                      <Button onClick={resetSubmitStatus}>
                        {language === "es" ? "Intentar de nuevo" : "Try again"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <CardContent className="p-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex flex-col md:grid md:grid-cols-3 mb-8 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg gap-2 md:gap-0">
                    <TabsTrigger
                      value="personal"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:shadow-sm rounded-md transition-all py-3"
                    >
                      {content.consultation.form.personalInfo}
                    </TabsTrigger>
                    <TabsTrigger
                      value="company"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:shadow-sm rounded-md transition-all py-3"
                    >
                      {content.consultation.form.companyInfo}
                    </TabsTrigger>
                    <TabsTrigger
                      value="project"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:shadow-sm rounded-md transition-all py-3"
                    >
                      {content.consultation.form.projectDetails}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.firstName}
                        </Label>
                        <Input
                          id="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.firstName
                          }
                          className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500 ${
                            errors.firstName
                              ? "border-red-500 dark:border-red-700"
                              : ""
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.lastName}
                        </Label>
                        <Input
                          id="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.lastName
                          }
                          className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500 ${
                            errors.lastName
                              ? "border-red-500 dark:border-red-700"
                              : ""
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.email}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.email
                          }
                          className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500 ${
                            errors.email
                              ? "border-red-500 dark:border-red-700"
                              : ""
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.phone}
                        </Label>
                        <Input
                          id="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.phone
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Label
                        htmlFor="position"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {content.consultation.form.position}
                      </Label>
                      <Input
                        id="position"
                        value={formState.position}
                        onChange={handleChange}
                        placeholder={
                          content.consultation.form.placeholder.position
                        }
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                      />
                    </motion.div>
                    <motion.div
                      className="flex justify-end mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button
                        onClick={() => handleNextTab("personal", "company")}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {language === "es" ? "Siguiente" : "Next"}
                      </Button>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="company" className="space-y-4">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="companyName"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.companyName}
                        </Label>
                        <Input
                          id="companyName"
                          value={formState.companyName}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.companyName
                          }
                          className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500 ${
                            errors.companyName
                              ? "border-red-500 dark:border-red-700"
                              : ""
                          }`}
                        />
                        {errors.companyName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="industry"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.industry}
                        </Label>
                        <Input
                          id="industry"
                          value={formState.industry}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.industry
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="employees"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.employees}
                        </Label>
                        <Input
                          id="employees"
                          value={formState.employees}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.employees
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="address"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.address}
                        </Label>
                        <Input
                          id="address"
                          value={formState.address}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.address
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.city}
                        </Label>
                        <Input
                          id="city"
                          value={formState.city}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.city
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.country}
                        </Label>
                        <Input
                          id="country"
                          value={formState.country}
                          onChange={handleChange}
                          placeholder={
                            content.consultation.form.placeholder.country
                          }
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex justify-between mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => handlePrevTab("company", "personal")}
                        className="border-gray-300 dark:border-gray-700"
                      >
                        {language === "es" ? "Anterior" : "Previous"}
                      </Button>
                      <Button
                        onClick={() => handleNextTab("company", "project")}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {language === "es" ? "Siguiente" : "Next"}
                      </Button>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="project" className="space-y-4">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Label
                        htmlFor="projectType"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {content.consultation.form.projectType}
                      </Label>
                      <Select
                        value={formState.projectType}
                        onValueChange={(value) =>
                          handleSelectChange("projectType", value)
                        }
                      >
                        <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                          <SelectValue
                            placeholder={
                              language === "es"
                                ? "Seleccione un tipo"
                                : "Select a type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {content.consultation.form.options.projectType.map(
                            (type, index) => (
                              <SelectItem key={index} value={type}>
                                {type}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Label
                        htmlFor="projectDescription"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {content.consultation.form.projectDescription}
                      </Label>
                      <Textarea
                        id="projectDescription"
                        value={formState.projectDescription}
                        onChange={handleChange}
                        placeholder={
                          content.consultation.form.placeholder
                            .projectDescription
                        }
                        rows={4}
                        className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500 ${
                          errors.projectDescription
                            ? "border-red-500 dark:border-red-700"
                            : ""
                        }`}
                      />
                      {errors.projectDescription && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.projectDescription}
                        </p>
                      )}
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="budget"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.budget}
                        </Label>
                        <Select
                          value={formState.budget}
                          onValueChange={(value) =>
                            handleSelectChange("budget", value)
                          }
                        >
                          <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                            <SelectValue
                              placeholder={
                                language === "es"
                                  ? "Seleccione un rango"
                                  : "Select a range"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {content.consultation.form.options.budget.map(
                              (budget, index) => (
                                <SelectItem key={index} value={budget}>
                                  {budget}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="timeline"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {content.consultation.form.timeline}
                        </Label>
                        <Select
                          value={formState.timeline}
                          onValueChange={(value) =>
                            handleSelectChange("timeline", value)
                          }
                        >
                          <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                            <SelectValue
                              placeholder={
                                language === "es"
                                  ? "Seleccione un plazo"
                                  : "Select a timeline"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {content.consultation.form.options.timeline.map(
                              (timeline, index) => (
                                <SelectItem key={index} value={timeline}>
                                  {timeline}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Label
                        htmlFor="additionalInfo"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {content.consultation.form.additionalInfo}
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={formState.additionalInfo}
                        onChange={handleChange}
                        placeholder={
                          content.consultation.form.placeholder.additionalInfo
                        }
                        rows={3}
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                      />
                    </motion.div>
                    <motion.div
                      className="flex justify-between mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => handlePrevTab("project", "company")}
                        className="border-gray-300 dark:border-gray-700"
                      >
                        {language === "es" ? "Anterior" : "Previous"}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {language === "es"
                              ? "Enviando..."
                              : "Submitting..."}
                          </>
                        ) : (
                          content.consultation.form.submit
                        )}
                      </Button>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer estandarizado */}
      <FooterSection currentYear={currentYear} />
    </div>
  );
}
