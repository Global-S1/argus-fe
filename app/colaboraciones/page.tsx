"use client"
import { useLanguage } from "@/context/language-context"
import { es, en } from "@/lib/content"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ChatBubble } from "@/components/chat-bubble"
import { FooterSection } from "@/components/sections/footer-section"
import { InfiniteCarousel } from "@/components/infinite-carousel"

export default function ColaboracionesPage() {
  const { language } = useLanguage()
  const content = language === "es" ? es : en
  const currentYear = new Date().getFullYear()

  // Datos de clientes para el carrusel
  const clients = [
    { id: 1, name: "AESA", image: "/customers/AESA.png" },
    { id: 2, name: "Ángeles Solest", image: "/customers/Angeles-Solest.png" },
    { id: 3, name: "EQUANS", image: "/customers/EQUANS.png" },
    { id: 4, name: "Alfa Co", image: "/customers/Alfa-Co.png" },
    { id: 5, name: "Inchcape", image: "/customers/Inchcape.webp" },
    { id: 6, name: "GM", image: "/customers/GM.png" },
    { id: 7, name: "INCIMMET", image: "/customers/INCIMMET.jpg" },
    { id: 8, name: "Molitalia", image: "/customers/Molitalia.png" },
    { id: 9, name: "Telefonica", image: "/customers/Telefonica.jpg" },
    { id: 10, name: "Quicksa", image: "/customers/Quicksa.webp" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar Flotante */}
      <FloatingNavbar />

      <main className="flex-1 pt-20">
        {/* Carrusel de Colaboraciones */}
        <section className="py-12">
          <InfiniteCarousel clients={clients} title={content.clients.title} description={content.clients.description} />
        </section>

        {/* Sección de testimonios */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-center font-heading bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-12">
              {content.clients.testimonials}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonio 1 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">AC</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Alfa Co</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "es" ? "Director de Operaciones" : "Operations Director"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {language === "es"
                    ? '"La implementación de las soluciones logísticas de Argus nos permitió reducir los tiempos de entrega en un 30% y mejorar la precisión de nuestro inventario."'
                    : '"The implementation of Argus logistics solutions allowed us to reduce delivery times by 30% and improve our inventory accuracy."'}
                </p>
              </div>

              {/* Testimonio 2 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">TF</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Telefónica</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "es" ? "Gerente de Logística" : "Logistics Manager"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {language === "es"
                    ? '"El equipo de Argus demostró un profundo conocimiento de nuestros procesos y nos ayudó a optimizar nuestra cadena de suministro de manera significativa."'
                    : '"The Argus team demonstrated a deep understanding of our processes and helped us significantly optimize our supply chain."'}
                </p>
              </div>

              {/* Testimonio 3 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">GM</span>
                  </div>
                  <div>
                    <h3 className="font-bold">General Motors</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "es" ? "Director de Cadena de Suministro" : "Supply Chain Director"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {language === "es"
                    ? '"La consultoría de Argus nos proporcionó insights valiosos que nos permitieron identificar y resolver cuellos de botella en nuestra operación logística."'
                    : '"Argus consulting provided us with valuable insights that allowed us to identify and resolve bottlenecks in our logistics operation."'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterSection currentYear={currentYear} />

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  )
}
