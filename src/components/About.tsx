'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Zap, Shield, Heart, Target, Star, Globe, Stethoscope, Pill, Syringe, ShieldPlus } from 'lucide-react'
import { motion } from 'framer-motion'

const TIMELINE_EVENTS = [
    {
        title: 'Preparación',
        time: 'Meses previos',
        description: 'Establecimiento de fundamentos, desarrollo del plan de negocio, investigación de mercado, y búsqueda de proveedores internacionales.',
        icon: '🏗️',
    },
    {
        title: 'Fundación y Desarrollo',
        time: 'Primeros meses',
        description: 'Definición de la visión empresarial, establecimiento de contactos con proveedores y preparación para licitaciones estatales.',
        icon: '🚀',
    },
    {
        title: 'Lanzamiento',
        time: '1-2 meses',
        description: 'Inicio de operaciones, oferta de productos médicos y farmacéuticos, importación de equipos esenciales y selección de personal capacitado.',
        icon: '🎉',
    },
    {
        title: 'Operación Inicial',
        time: '1-6 meses',
        description: 'Participación activa en licitaciones estatales y abastecimiento al sistema de salud peruano.',
        icon: '⚙️',
    },
    {
        title: 'Expansión y Consolidación',
        time: '6-12 meses',
        description: 'Ampliación del catálogo de productos, fortalecimiento de alianzas y optimización de operaciones.',
        icon: '📈',
    },
    {
        title: 'A largo plazo',
        time: 'En curso',
        description: 'Innovación continua, expansión de importaciones, optimización de logística para ventas en línea y liderazgo en licitaciones.',
        icon: '🔮',
    },
]

const VALUES = [
    {
        name: 'Innovación',
        description: 'Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios.',
        icon: <Zap className="w-12 h-12" />,
        color: 'bg-[#00B14B] text-white',
    },
    {
        name: 'Calidad',
        description: 'Nos comprometemos a ofrecer productos de la más alta calidad para el cuidado de la salud.',
        icon: <Shield className="w-12 h-12" />,
        color: 'bg-[#00913D] text-white',
    },
    {
        name: 'Integridad',
        description: 'Actuamos con honestidad y transparencia en todas nuestras operaciones.',
        icon: <Heart className="w-12 h-12" />,
        color: 'bg-[#FF9900] text-white',
    },
    {
        name: 'Compromiso',
        description: 'Estamos dedicados a satisfacer las necesidades de nuestros clientes y la comunidad médica.',
        icon: <Target className="w-12 h-12" />,
        color: 'bg-[#FEA71D] text-white',
    },
    {
        name: 'Excelencia',
        description: 'Nos esforzamos por superar las expectativas en todo lo que hacemos.',
        icon: <Star className="w-12 h-12" />,
        color: 'bg-[#00B14B] text-white',
    },
    {
        name: 'Responsabilidad',
        description: 'Asumimos la responsabilidad de nuestras acciones y su impacto en la sociedad y el medio ambiente.',
        icon: <Globe className="w-12 h-12" />,
        color: 'bg-[#00913D] text-white',
    },
]

const ACHIEVEMENTS = [
    { number: '1000+', description: 'Productos médicos importados' },
    { number: '50+', description: 'Licitaciones estatales ganadas' },
    { number: '100+', description: 'Hospitales abastecidos' },
    { number: '5000+', description: 'Pacientes beneficiados' },
]

const PRODUCT_CATEGORIES = [
    { name: 'Equipos Médicos', icon: <Stethoscope className="w-8 h-8" /> },
    { name: 'Cuidado Bucal', icon: <ShieldPlus className="w-8 h-8" /> },
    { name: 'Pruebas Rápidas', icon: <Syringe className="w-8 h-8" /> },
    { name: 'Productos Farmacéuticos', icon: <Pill className="w-8 h-8" /> },
]

export default function About() {
  const [currentValue, setCurrentValue] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % TIMELINE_EVENTS.length)
    }, 5000) // Change active item every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const nextValue = () => {
    setIsFlipped(false)
    setCurrentValue((prev) => (prev + 1) % VALUES.length)
  }

  const prevValue = () => {
    setIsFlipped(false)
    setCurrentValue((prev) => (prev - 1 + VALUES.length) % VALUES.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F2F2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-[#00B14B]">Sobre Medical Isvil SAC</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#00B14B]">Nuestra Misión</h2>
            <p className="mb-4 text-[#0D0D0D]">
              En Medical Isvil, nos dedicamos a proporcionar productos de alta calidad para el cuidado de la salud. 
              Nuestro compromiso es ofrecer soluciones efectivas y accesibles, mejorando la calidad de vida de las personas a través de productos innovadores y de confianza.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#00B14B]">Nuestra Visión</h2>
            <p className="text-[#0D0D0D]">
              Aspiramos a ser líderes indiscutibles en el mercado de productos de salud en Perú, reconocidos por nuestra calidad superior, servicio al cliente excepcional y contribución significativa al bienestar de la sociedad.
            </p>
          </div>
        </div>

        <div className="mb-12">
  <h2 className="text-3xl font-semibold mb-6 text-center text-[#00B14B]">Nuestra Trayectoria</h2>
  
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00B14B]"></div>
    {TIMELINE_EVENTS.map((event, index) => (
      <motion.div // Cambiar a motion.div para animación
        key={index}
        className={`relative mb-8 flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        initial={{ opacity: 0, y: 20 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0 }} // Estado final al entrar en vista
        exit={{ opacity: 0, y: 20 }} // Estado al salir de vista
        transition={{ duration: 0.5 }} // Duración de la animación
        viewport={{ once: false }} // Permitir que la animación se repita al volver a entrar en vista
      >
        <div className="hidden md:block w-1/2 m-2"></div>
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${index === activeTimelineItem ? 'bg-[#FF9900]' : 'bg-[#00B14B]'} transition-all duration-300 ease-in-out z-10`}
          style={{
            boxShadow: index === activeTimelineItem ? '0 0 0 4px rgba(255, 153, 0, 0.3)' : 'none',
            animation: index === activeTimelineItem ? 'pulse 2s infinite' : 'none'
          }}
        ></div>
        <div className={`bg-white p-4 rounded-lg shadow-md ${index === activeTimelineItem ? 'border-2 border-[#FF9900]' : ''} w-full md:w-1/2`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{event.icon}</span>
            <h3 className="text-xl font-semibold text-[#00B14B]">{event.title}</h3>
          </div>
          <p className="text-sm text-[#0D0D0D] mb-2">{event.time}</p>
          <p className="text-[#0D0D0D]">{event.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>

        <div className="relative mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#00B14B]">Nuestros Valores</h2>
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevValue} className="border border-[#00B14B] text-[#00B14B] hover:bg-[#00B14B] hover:text-white px-2 py-1 rounded">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-lg font-semibold text-[#0D0D0D]">
              {currentValue + 1} / {VALUES.length}
            </span>
            <button onClick={nextValue} className="border border-[#00B14B] text-[#00B14B] hover:bg-[#00B14B] hover:text-white px-2 py-1 rounded">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div 
            className={`mb-8 cursor-pointer ${VALUES[currentValue].color} rounded-lg p-6 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 ease-in-out transform ${isFlipped ? 'scale-105' : 'scale-100'}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {isFlipped ? (
              <p className="text-lg">{VALUES[currentValue].description}</p>
            ) : (
              <>
                {VALUES[currentValue].icon}
                <h3 className="text-2xl font-semibold mt-4">{VALUES[currentValue].name}</h3>
              </>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#00B14B]">Nuestros Logros</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-3xl font-bold text-[#00B14B] mb-2">{achievement.number}</h3>
                <p className="text-sm text-[#0D0D0D]">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#00B14B]">Nuestros Productos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <div className="text-[#00B14B]">{category.icon}</div>
                <h3 className="text-xl font-semibold mt-4 text-center text-[#0D0D0D]">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}