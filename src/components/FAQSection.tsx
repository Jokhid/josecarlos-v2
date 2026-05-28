import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "¿Cuánto cuesta la primera sesión de diagnóstico financiero?",
      answer: "La sesión inicial de diagnóstico financiero es 100% gratuita y sin ningún tipo de compromiso. Analizaremos tu situación actual (ingresos, gastos, deudas e hipoteca) y trazaremos un plan estratégico preliminar para ver cómo puedes optimizar tus recursos."
    },
    {
      question: "¿Trabajas con bancos específicos o eres totalmente independiente?",
      answer: "Soy un asesor financiero totalmente independiente. No estoy ligado a ninguna entidad bancaria o aseguradora. Esto me permite comparar ofertas entre más de 20 bancos para conseguirte las mejores condiciones del mercado en hipotecas u otros productos, poniendo siempre tus intereses en primer lugar."
    },
    {
      question: "¿Cómo consigues mejorar las condiciones de una hipoteca?",
      answer: "A través de dos vías principales: la negociación directa por volumen con las áreas de riesgo de los bancos (a las que los particulares no suelen tener acceso) y la gestión del cambio de tu hipoteca actual a otra entidad (subrogación) si ésta ofrece un interés o comisiones mucho más favorables."
    },
    {
      question: "¿Qué garantías tengo al contratar tus servicios?",
      answer: "Toda mi actividad está regulada y supervisada bajo las estrictas normativas del Banco de España y la Dirección General de Seguros y Fondos de Pensiones (DGSFP). Cuento con las acreditaciones legales correspondientes para la intermediación hipotecaria y la asesoría en planificación de ahorro e inversión."
    },
    {
      question: "¿También gestionas seguros vinculados a préstamos e hipotecas?",
      answer: "Sí. Gran parte del ahorro hipotecario se pierde al aceptar los seguros vinculados 'obligatorios' que imponen los bancos. Analizo esas vinculaciones para demostrarte cómo contratar seguros de vida, hogar o salud por fuera puede ahorrarte miles de euros al año manteniendo la bonificación de tu préstamo."
    },
    {
      question: "¿Ofreces servicios de Administración de Fincas en Alicante?",
      answer: "Sí, ofrezco un servicio profesional de administración de fincas enfocado en la transparencia, la reducción de costes de mantenimiento (gas, ascensores, limpieza) y la resolución ágil de incidencias en comunidades de vecinos en Elche, Alicante y alrededores cercanos."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={index} 
            className="border-b border-zinc-200 bg-white transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-zinc-50 transition-colors group cursor-pointer"
            >
              <span className="text-zinc-900 font-semibold tracking-tight text-sm md:text-base group-hover:text-orange-600 transition-colors">
                {faq.question}
              </span>
              <span className="ml-4 flex-shrink-0 text-zinc-400 group-hover:text-orange-600 transition-colors">
                {isOpen ? (
                  <Minus className="w-5 h-5 transition-transform duration-300 rotate-180" />
                ) : (
                  <Plus className="w-5 h-5 transition-transform duration-300" />
                )}
              </span>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 border-t border-zinc-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 py-5 text-zinc-650 text-sm leading-relaxed bg-zinc-50/50">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
