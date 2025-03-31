"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { es, en } from "@/lib/content";

type TBubbles = {
  size: string;
  distance: string;
  position: string;
  time: string;
  delay: string;
};

export function HeroSection() {
  const { language } = useLanguage();
  const content = language === "es" ? es : en;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bubbles, setBubbles] = useState<TBubbles[]>([]);

  // Textos dinámicos relacionados con logística
  const dynamicTexts = [
    "Optimizando cadenas de suministro globales",
    "Transformando la logística empresarial",
    "Soluciones de inventario a gran escala",
    "Eficiencia en cada eslabón logístico",
    "Digitalización de procesos logísticos",
  ];

  // Detectar tamaño de pantalla para ocultar imagen en móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ocultar en pantallas menores a md
    };
    handleResize(); // Ejecutar al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cambiar el texto cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTextIndex(
          (prevIndex) => (prevIndex + 1) % dynamicTexts.length
        );
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newBubbles = [...Array(15)].map((_, i) => ({
      size: `${Math.random() * 5 + 2}rem`,
      distance: `${Math.random() * 6 + 4}rem`,
      position: `${Math.random() * 100}%`,
      time: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 2}s`,
    }));
    setBubbles(newBubbles);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calcular la posición considerando el navbar
      const navbarHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Fondo dinámico con CSS puro */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-90" />

        {/* Burbujas animadas */}
        <div className="bubbles">
          {bubbles.map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={
                {
                  "--size": `${Math.random() * 5 + 2}rem`,
                  "--distance": `${Math.random() * 6 + 4}rem`,
                  "--position": `${Math.random() * 100}%`,
                  "--time": `${Math.random() * 2 + 2}s`,
                  "--delay": `${Math.random() * 2}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white">
                {content.hero.title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {content.hero.description}
              </p>
            </div>

            {/* Texto dinámico con animación */}
            <div className="h-12 flex items-center overflow-hidden my-4">
              <motion.p
                className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: isAnimating ? 0 : 1,
                  y: isAnimating ? -20 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {dynamicTexts[currentTextIndex]}
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                onClick={() => scrollToSection("servicios")}
              >
                {content.hero.learnMore}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => scrollToSection("contacto")}
              >
                {content.hero.contact}
              </Button>
            </div>
          </motion.div>

          {/* Imagen del trabajador con sombra mejorada - oculta en móvil */}
          {!isMobile && (
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
                  <Image
                    src="/trabajador.png"
                    alt="Trabajador logístico"
                    fill
                    className="object-contain drop-shadow-2xl filter"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Soluciones optimizadas
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
