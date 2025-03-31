"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"

export default function ConsultationPage() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const [activeTab, setActiveTab] = useState("personal")
  const currentYear = new Date().getFullYear()

  const handleNextTab = (current: string, next: string) => {
    setActiveTab(next)
  }

  const handlePrevTab = (current: string, prev: string) => {
    setActiveTab(prev)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Argus Logo" width={32} height={32} className="animate-pulse-slow" />
              <span className="text-xl font-bold font-heading text-primary-500">Argus</span>
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
              <p className="text-gray-600 dark:text-gray-300 md:text-xl">{content.consultation.description}</p>
            </motion.div>

            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                        <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.firstName}
                        </Label>
                        <Input
                          id="firstName"
                          placeholder={content.consultation.form.placeholder.firstName}
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.lastName}
                        </Label>
                        <Input
                          id="lastName"
                          placeholder={content.consultation.form.placeholder.lastName}
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
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.email}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={content.consultation.form.placeholder.email}
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.phone}
                        </Label>
                        <Input
                          id="phone"
                          placeholder={content.consultation.form.placeholder.phone}
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
                      <Label htmlFor="position" className="text-gray-700 dark:text-gray-300">
                        {content.consultation.form.position}
                      </Label>
                      <Input
                        id="position"
                        placeholder={content.consultation.form.placeholder.position}
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
                        <Label htmlFor="companyName" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.companyName}
                        </Label>
                        <Input
                          id="companyName"
                          placeholder={content.consultation.form.placeholder.companyName}
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.industry}
                        </Label>
                        <Input
                          id="industry"
                          placeholder={content.consultation.form.placeholder.industry}
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
                        <Label htmlFor="employees" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.employees}
                        </Label>
                        <Input
                          id="employees"
                          placeholder={content.consultation.form.placeholder.employees}
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.address}
                        </Label>
                        <Input
                          id="address"
                          placeholder={content.consultation.form.placeholder.address}
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
                        <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.city}
                        </Label>
                        <Input
                          id="city"
                          placeholder={content.consultation.form.placeholder.city}
                          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.country}
                        </Label>
                        <Input
                          id="country"
                          placeholder={content.consultation.form.placeholder.country}
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
                      <Label htmlFor="projectType" className="text-gray-700 dark:text-gray-300">
                        {content.consultation.form.projectType}
                      </Label>
                      <Select>
                        <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                          <SelectValue placeholder={language === "es" ? "Seleccione un tipo" : "Select a type"} />
                        </SelectTrigger>
                        <SelectContent>
                          {content.consultation.form.options.projectType.map((type, index) => (
                            <SelectItem key={index} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Label htmlFor="projectDescription" className="text-gray-700 dark:text-gray-300">
                        {content.consultation.form.projectDescription}
                      </Label>
                      <Textarea
                        id="projectDescription"
                        placeholder={content.consultation.form.placeholder.projectDescription}
                        rows={4}
                        className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500"
                      />
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.budget}
                        </Label>
                        <Select>
                          <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                            <SelectValue placeholder={language === "es" ? "Seleccione un rango" : "Select a range"} />
                          </SelectTrigger>
                          <SelectContent>
                            {content.consultation.form.options.budget.map((budget, index) => (
                              <SelectItem key={index} value={budget}>
                                {budget}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-gray-700 dark:text-gray-300">
                          {content.consultation.form.timeline}
                        </Label>
                        <Select>
                          <SelectTrigger className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-primary-500">
                            <SelectValue
                              placeholder={language === "es" ? "Seleccione un plazo" : "Select a timeline"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {content.consultation.form.options.timeline.map((timeline, index) => (
                              <SelectItem key={index} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
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
                      <Label htmlFor="additionalInfo" className="text-gray-700 dark:text-gray-300">
                        {content.consultation.form.additionalInfo}
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder={content.consultation.form.placeholder.additionalInfo}
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
                        type="submit"
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {content.consultation.form.submit}
                      </Button>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-white dark:bg-gray-900 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Argus Logo" width={24} height={24} />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} Argus. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              {content.footer.terms}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              {content.footer.privacy}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              {content.footer.contact}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

