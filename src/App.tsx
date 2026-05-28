import React, { useState } from 'react';
import { 
  Shield, 
  Percent, 
  Activity, 
  HelpCircle, 
  ChevronRight, 
  PhoneCall, 
  Mail, 
  MapPin, 
  FileText, 
  UserCheck, 
  Lock, 
  Award, 
  ExternalLink,
  Zap,
  DollarSign,
  TrendingUp,
  Briefcase,
  Heart,
  Home,
  Menu,
  X,
  Phone
} from 'lucide-react';
import LeadForm from './components/LeadForm';
import FAQSection from './components/FAQSection';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Financial Calculator States
  const [income, setIncome] = useState<number>(2500);
  const [housing, setHousing] = useState<number>(1100);
  const [debts, setDebts] = useState<number>(300);
  const [savings, setSavings] = useState<number>(200);

  // Computed Values
  const housingRatio = Math.round((housing / income) * 100) || 0;
  const debtRatio = Math.round((debts / income) * 100) || 0;
  const savingsRatio = Math.round((savings / income) * 100) || 0;
  const safeLimit = 35; // Recommended max debt/housing ratio is 35-40%

  // Services state for interactive details modal
  const [activeModalService, setActiveModalService] = useState<any | null>(null);

  const servicesList = [
    {
      icon: Home,
      title: "Hipotecas y Financiación",
      subtitle: "Hipotecas en Altea, Benidorm y Alicante ",
      desc: "Negociación directa con entidades bancarias para la obtención de nuevas hipotecas o la subrogación (mejora) de tu préstamo actual.",
      details: "Tanto si vas a adquirir tu primera vivienda como si deseas refinanciar o cambiar tu hipoteca variable actual a tipo fijo, realizo un estudio de viabilidad con más de 20 bancos para conseguir tipos de interés mínimos, reducción de vinculaciones y comisiones nulas."
    },
    {
      icon: Shield,
      title: "Protección de Ingresos",
      subtitle: "Especialmente para Autónomos",
      desc: "Planes de contingencia ante bajas laborales, invalidez o incapacidad temporal para profesionales libres y por cuenta ajena.",
      details: "Un autónomo de baja médica suele ver reducidos sus ingresos a la mitad de forma inmediata mientras mantiene sus gastos fijos. Estructuro planes personalizados de indemnización diaria por hospitalización, enfermedades o accidentes de trabajo para blindar tu economía familiar."
    },
    {
      icon: TrendingUp,
      title: "Planificación del Ahorro",
      subtitle: "Jubilación y Optimización Fiscal",
      desc: "Asesoramiento sobre PIAS, fondos indexados y planes de pensiones para maximizar tus retornos y desgravar impuestos legalmente.",
      details: "Te ayudo a configurar tu plan de ahorro automatizado utilizando el interés compuesto y aplicando estrategias de diversificación de activos alineadas con tu perfil de riesgo. El objetivo es estructurar tu capital de forma que gane rentabilidad real batiendo a la inflación."
    },
    {
      icon: Heart,
      title: "Salud y Bienestar Familiar",
      subtitle: "Cobertura Médica Premium",
      desc: "Seguros de salud privados con acceso a cuadros médicos de primer orden europeo, intervenciones sin listas de espera y excelente cobertura.",
      details: "Diseño pólizas de salud personalizadas (con o sin copago) que garantizan atención inmediata en las principales clínicas especializadas del país, coberturas dentales extensivas, telemedicina de urgencia 24/7 y la seguridad que tu familia merece."
    },
    {
      icon: DollarSign,
      title: "Consolidación de Deudas",
      subtitle: "Unificación y Reestructuración",
      desc: "Agrupación de varios préstamos o tarjetas en una sola cuota mensual reducida con excelentes condiciones competitivas de mercado.",
      details: "Si lidias con cuotas dispersas de tarjetas de crédito o préstamos personales a intereses altos, analizamos la consolidación de toda tu deuda en un único préstamo hipotecario. Se puede llegar a reducir tu carga mensual total hasta en un 50% facilitando tu liquidez diaria."
    },
    {
      icon: Briefcase,
      title: "Administración de Fincas",
      subtitle: "Comunidades Inteligentes en Alicante",
      desc: "Gestión clara, auditoría de costes de comunidad, optimización de mantenimientos e incidencias de forma transparente.",
      details: "Me encargo de la administración de tu comunidad de propietarios con un enfoque de eficiencia económica: revisando contratos de proveedores habituales, gestionando el cobro de cuotas contra la morosidad, y resolviendo siniestros con seguros de hogar en Alicante de manera ágil."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 tracking-normal leading-normal">
      
      {/* Upper Announcement Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center border-b border-slate-800">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">
          📍 Diagnóstico Financiero Presencial en Altea, Benidorm, Alicante y Online a nivel nacional • <span className="text-orange-400 font-bold">Sesión 100% gratuita</span>
        </p>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Brand/Identity */}
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-bold tracking-tight uppercase text-slate-900 leading-none">
              José Carlos Hidalgo
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-orange-600 mt-1">
              Asesor Financiero e Hipotecario
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#servicios" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">Servicios</a>
            <a href="#analisis" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">Auto-Test</a>
            <a href="#metodo" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">Método</a>
            <a href="#sobre-mi" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">Sobre Mí</a>
            <a href="#preguntas" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">FAQs</a>
          </nav>

          {/* Sticky CTA / Contact Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => setShowAdmin(true)} 
              className="p-2.5 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-lg cursor-pointer"
              title="Acceso Administración"
            >
              <Lock className="w-4 h-4" />
            </button>
            <a 
              href="https://calendly.com/jchidalgo/plan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 bg-orange-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-700 transition-all cursor-pointer rounded-lg shadow-sm"
            >
              Agendar Diagnóstico 0€
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu container */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-6 space-y-3 flex flex-col animate-in slide-in-from-top duration-200">
            <a 
              href="#servicios" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 py-1"
            >
              Servicios
            </a>
            <a 
              href="#analisis" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 py-1"
            >
              Auto-Test Financiero
            </a>
            <a 
              href="#metodo" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 py-1"
            >
              Método de Trabajo
            </a>
            <a 
              href="#sobre-mi" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 py-1"
            >
              Sobre Mí
            </a>
            <a 
              href="#preguntas" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-600 py-1"
            >
              FAQs
            </a>
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <button 
                onClick={() => { setShowAdmin(true); setMobileMenuOpen(false); }}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Admin
              </button>
              <a 
                href="https://calendly.com/jchidalgo/plan" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-orange-600 text-white font-bold text-xs uppercase tracking-widest text-center rounded-lg"
              >
                Diagnóstico Gratuito
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-24 border-b border-slate-200 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-lg text-orange-700 text-[10px] font-bold uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 text-orange-600" /> Consultoría Patrimonial Independiente
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
                Protege tus ingresos, <br className="hidden md:inline" />
                tu vivienda y tu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-orange-500">futuro financiero</span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                ¿Estás seguro de que tu banco te ofrece las mejores condiciones? Analizo tu hipoteca, deudas, seguros y jubilación de manera neutral. Encuentra alternativas de ahorro real sin condicionantes comerciales de una sucursal tradicional.
              </p>

              {/* Bento Trust Elements */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-slate-900">360°</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Análisis de Cartera</div>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-slate-900">0€</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Diagnóstico Inicial</div>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-4 col-span-2 md:col-span-1 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-slate-900">&gt;20</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Bancos Negociados</div>
                </div>
              </div>

              {/* Action Rows */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a 
                  href="https://calendly.com/jchidalgo/plan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-orange-600 text-white font-bold text-xs uppercase tracking-widest text-center shadow-md hover:bg-orange-700 transition-all cursor-pointer rounded-lg"
                >
                  Agendar Diagnóstico Gratuito
                </a>
                <a 
                  href="#servicios" 
                  className="px-8 py-4 border border-slate-200 bg-transparent text-slate-700 font-bold text-xs uppercase tracking-widest text-center hover:bg-slate-50 transition-colors rounded-lg"
                >
                  Ver Servicios
                </a>
              </div>
            </div>

            {/* Right Column Portrait */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-slate-100 border-4 border-slate-900 shadow-xl overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-500/20 to-transparent z-10 transition-opacity"></div>
                <img 
                  src="/yo traje azul.png" 
                  referrerPolicy="no-referrer"
                  alt="José Carlos Hidalgo Ortega - Asesor Financiero" 
                  className="w-full h-full object-cover grayscale brightness-95 filter transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-4 bg-white border border-slate-200 shadow-xl px-5 py-3 rounded-lg hidden md:flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-600" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Regulado por</span>
                  <span className="text-xs font-bold text-slate-800">Banco de España & DGSFP</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Triple Pillars Section */}
      <section className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl space-y-2 mb-12">
            <span className="text-orange-400 font-bold uppercase tracking-widest text-[10px] block">Áreas Clave de Estabilidad</span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-none">Los Tres Pilares de tu Bienestar Financiero</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="border border-slate-800 bg-slate-950/40 p-8 rounded-xl space-y-4">
              <span className="text-4xl font-extrabold font-mono text-slate-800 block">01</span>
              <h3 className="text-base font-bold uppercase tracking-widest text-white">Ingresos y Estabilidad</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Blindar tu seguridad económica frente a incapacidades temporales o bajas médicas. Es vital estructurar una cobertura diaria para proteger a tu familia y seguir atendiendo tus pasivos sin asfixia.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border border-slate-800 bg-slate-950/40 p-8 rounded-xl space-y-4">
              <span className="text-4xl font-extrabold font-mono text-slate-800 block">02</span>
              <h3 className="text-base font-bold uppercase tracking-widest text-white">Hipotecas y Endeudamiento</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optimizar el coste del préstamo más pesado de tu vida. Monitoreo las fluctuaciones de tipos de interés y renegocio activamente tu deuda para acortar plazos o pasar a tipos fijos más ventajosos.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="border border-slate-800 bg-slate-950/40 p-8 rounded-xl space-y-4">
              <span className="text-4xl font-extrabold font-mono text-slate-800 block">03</span>
              <h3 className="text-base font-bold uppercase tracking-widest text-white">Ahorro y Planificación</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Establecer mecanismos de capitalización inteligente para el largo plazo (PIAS, planes de previsión) con flexibilidad de rescate y máxima optimización fiscal orientada al momento de la jubilación.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Warning/Problems section */}
      <section className="bg-slate-50 py-16 md:py-20 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex p-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-full">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
              La mayoría de personas toma decisiones financieras clave <span className="text-orange-600 font-bold">demasiado tarde</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              La falta de información transparente te expone a costes ocultos de por vida. Compara las malas prácticas más recurrentes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 font-sans">
            <div className="bg-white border border-slate-200 p-8 text-center space-y-3 shadow-sm rounded-xl">
              <div className="h-10 w-10 bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-700 mx-auto rounded-lg">A</div>
              <h4 className="font-bold text-slate-900 uppercase tracking-tight text-sm">Firmar la propuesta del banco</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Por comodidad, comodidad o desconocimiento de otras ofertas. Un banco tradicional solo vende sus propios productos, que rara vez coinciden con las mejores condiciones del mercado.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 text-center space-y-3 shadow-sm rounded-xl">
              <div className="h-10 w-10 bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-700 mx-auto rounded-lg">B</div>
              <h4 className="font-bold text-slate-900 uppercase tracking-tight text-sm">No blindar ingresos por accidente</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Especialmente los autónomos de la provincia de Alicante. Depender enteramente de la sanidad o de la Seguridad Social estatal deja tu economía en estado crítico si sufres una baja prolongada.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 text-center space-y-3 shadow-sm rounded-xl">
              <div className="h-10 w-10 bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-700 mx-auto rounded-lg">C</div>
              <h4 className="font-bold text-slate-900 uppercase tracking-tight text-sm">Ahorrar sin interés compuesto</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dejar el capital inactivo en la cuenta corriente tradicional del banco o contratar planes con excesivas comisiones de gestión que consumen tus márgenes de rentabilidad a largo plazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="servicios" className="bg-white py-16 md:py-24 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Servicios Clave</span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">Mi Ámbito de Asesoramiento Cohesivo</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 max-w-md leading-relaxed">
              No vendo productos enlatados. Analizo tu situation global y estructuro las soluciones óptimas que mejor se adaptan a tus objetivos financieros particulares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div 
                  key={idx} 
                  className="group bg-white border border-slate-200 hover:border-orange-600 p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md rounded-xl"
                >
                  <div className="space-y-4">
                    <div className="inline-flex p-3 bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white rounded-lg transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 uppercase tracking-tight text-base group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">
                        {service.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Know More link */}
                  <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                    <button 
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      Ampliar Detalles <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Tool - Health Test Calculator */}
      <section id="analisis" className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column Left: Calculations sliders */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-orange-400 font-mono text-[10px] uppercase tracking-widest block font-bold">Auto-Diagnóstico Inicial</span>
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-none">Mide tu Ratio de Endeudamiento</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                  Ajusta los controles deslizantes con tus cifras aproximadas para estimar tu salud de endeudamiento y ver de forma interactiva si estás dentro del límite aconsejado por el Banco de España (35%).
                </p>
              </div>

              {/* Sliders Container */}
              <div className="space-y-5 bg-slate-950/60 p-6 border border-slate-800 rounded-xl">
                
                {/* Income slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-slate-300">
                    <span>Ingresos Netos Mensuales (Familiar)</span>
                    <span className="font-mono text-orange-400">{income} €</span>
                  </div>
                  <input 
                    type="range" 
                    min={1000} 
                    max={8000} 
                    step={100}
                    value={income} 
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full accent-orange-600 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>1.000 €</span>
                    <span>8.000 €</span>
                  </div>
                </div>

                {/* Housing slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-slate-300">
                    <span>Alquiler o Cuota Hipotecaria</span>
                    <span className="font-mono text-orange-400">{housing} €</span>
                  </div>
                  <input 
                    type="range" 
                    min={200} 
                    max={3000} 
                    step={50}
                    value={housing} 
                    onChange={(e) => setHousing(Number(e.target.value))}
                    className="w-full accent-orange-600 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>200 €</span>
                    <span>3.000 €</span>
                  </div>
                </div>

                {/* Debts slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-slate-300">
                    <span>Préstamos / Cuotas Tarjetas</span>
                    <span className="font-mono text-orange-400">{debts} €</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={2000} 
                    step={50}
                    value={debts} 
                    onChange={(e) => setDebts(Number(e.target.value))}
                    className="w-full accent-orange-600 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>0 €</span>
                    <span>2.000 €</span>
                  </div>
                </div>

                {/* Savings slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-slate-300">
                    <span>Ahorro Mensual Frecuente</span>
                    <span className="font-mono text-orange-400">{savings} €</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={2000} 
                    step={50}
                    value={savings} 
                    onChange={(e) => setSavings(Number(e.target.value))}
                    className="w-full accent-orange-600 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>0 €</span>
                    <span>2.000 €</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Column Right: Visual analysis stats */}
            <div className="lg:col-span-6 flex flex-col justify-center bg-slate-950 p-8 border border-slate-800 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full"></div>
              
              <div className="space-y-6 text-center md:text-left">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Resultado de Análisis</span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                    <span className="text-4xl md:text-5xl font-extrabold font-mono tracking-tighter text-orange-400">
                      {housingRatio + debtRatio}%
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Carga de Deuda Total</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Housing Indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 uppercase tracking-wider font-semibold">Tasa de Esfuerzo Vivienda</span>
                    <span className="font-mono text-zinc-200">{housingRatio}%</span>
                  </div>
                  {/* Debt Indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 uppercase tracking-wider font-semibold">Ratio de Deuda de Consumo</span>
                    <span className="font-mono text-zinc-200">{debtRatio}%</span>
                  </div>
                  {/* Savings percentage indicator link */}
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 uppercase tracking-wider font-semibold">Tasa de Ahorro Neto</span>
                    <span className="font-mono text-zinc-200">{savingsRatio}%</span>
                  </div>
                </div>

                {/* Analysis Message widget */}
                <div className={`p-4 border text-[13px] leading-relaxed rounded-xl ${
                  (housingRatio + debtRatio) <= safeLimit 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                }`}>
                  {(housingRatio + debtRatio) <= safeLimit ? (
                    <p>
                      <strong>✅ Estado Óptimo:</strong> Tus compromisos fijos de vivienda y préstamos están dentro del límite saludable recomendado (35%). Tienes margen de maniobra para potenciar tu planificación de ahorro.
                    </p>
                  ) : (
                    <p>
                      <strong>⚠️ Esfuerzo Elevado:</strong> Estás destinando un porcentaje superior al aconsejado a deudas fijas. Te sugiero revisar tu hipoteca variable actual o consolidar préstamos para disminuir drásticamente tu cuota mensual.
                    </p>
                  )}
                </div>

                <div className="pt-2 text-center md:text-left">
                  <a 
                    href="https://calendly.com/jchidalgo/plan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded-lg shadow-md"
                  >
                    Estudio de Viabilidad Completo 0€ <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Method section */}
      <section id="metodo" className="bg-white py-16 md:py-24 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs">Metodología Clara</span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-none font-sans">Mi Método de Trabajo en Tres Fases</h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              No pidas un producto a ciegas. Trazamos un circuito organized basado en métricas y garantías jurídicas para que tomes el control absoluto de tus finanzas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Phase 1 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-extrabold font-mono text-slate-200">01</div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Diagnóstico Patrimonial General</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recopilamos y analizamos la letra pequeña de tus pólizas de seguros, deudas, comisiones de tu hipoteca actual y tu previsión de jubilación pública estimada.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-extrabold font-mono text-slate-200">02</div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Detección de Fugas e Ineficiencias</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Identificamos 'fugas silenciosas' de dinero: coberturas duplicadas de seguros, hipotecas sobrevaloradas por vinculaciones abusivas...
              </p>
            </div>

            {/* Phase 3 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-extrabold font-mono text-slate-200">03</div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">3. Plan de Acción y Comparativa</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Te entrego un informe ejecutivo con opciones reales de mejora y ahorro contrastadas entre más de 20 entidades financieras nacionales de primer nivel.
              </p>
            </div>

          </div>

          <div className="mt-16 bg-slate-50 border border-slate-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between rounded-xl shadow-xs">
            <div className="space-y-2 max-w-xl">
              <h4 className="font-bold text-slate-900 text-base uppercase tracking-tight">¿Tienes tus pólizas de seguros o última nómina a mano?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Podemos agilizar tu estudio en una sesión online. Realizo el filtrado técnico de las aseguradoras y entidades hipotecarias de inmediato para ofrecerte alternativas claras.
              </p>
            </div>
            <a 
              href="https://calendly.com/jchidalgo/plan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest text-center whitespace-nowrap rounded-lg transition-colors cursor-pointer"
            >
              Comenzar Diagnóstico
            </a>
          </div>

        </div>
      </section>

      {/* About Me Section */}
      <section id="sobre-mi" className="bg-slate-50 py-16 md:py-24 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left column headshot */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square border-4 border-slate-200 shadow-xl bg-slate-100 rounded-2xl overflow-hidden group">
                <img 
                  src="/yo traje azul.png" 
                  referrerPolicy="no-referrer"
                  alt="José Carlos Hidalgo Ortega" 
                  className="w-full h-full object-cover filter brightness-95 grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Right column description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block">Asesoramiento Ético e Independiente</span>
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">José Carlos Hidalgo Ortega</h2>
              </div>

              <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Mi misión como asesor financiero profesional es ayudarte a construir un patrimonio sólido, proteger las economías familiares frente a incidencias graves y optimizar el tipo de interés de tus pasivos hipotecarios de forma libre y transparente.
                </p>
                <p>
                  No vendo directrices ni campañas de ningún banco. Esto significa que cuando revisamos tu hipoteca o planificamos un plan de jubilación, te muestro exactamente las ofertas reales comparadas científicamente entre múltiples entidades del mercado para que decidas con conocimiento técnico de causa.
                </p>
                <p>
                  Además de la asesoría financiera y seguros de protección de baja para autónomos, gestiono de manera transparente comunidades en Altea y en la provincia de Alicante, optimizando sus cuentas mediante auditorías de proveedores periódicas.
                </p>
              </div>

              {/* Badges credentials */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Acreditaciones y Garantías Jurídicas</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold font-mono text-[9px] uppercase tracking-wider rounded-lg shadow-sm">
                    🎓 Certificado por Banco de España
                  </span>
                  <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold font-mono text-[9px] uppercase tracking-wider rounded-lg shadow-sm">
                    🛡️ Registro de la DGSFP
                  </span>
                  <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold font-mono text-[9px] uppercase tracking-wider rounded-lg shadow-sm">
                    ⚖️ Seguro Responsabilidad Civil Profesional
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs section */}
      <section id="preguntas" className="bg-white py-16 md:py-24 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs">Respuestas Claras</span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">Preguntas Frecuentes</h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              Resuelvo tus inquietudes principales en materia de comisiones, vinculaciones hipotecarias bancarias e independencia.
            </p>
          </div>

          <FAQSection />

        </div>
      </section>

      {/* Main Contact Section */}
      <section id="contacto" className="bg-slate-50 py-16 md:py-24 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Callouts */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-orange-50 rounded-full text-orange-700 border border-orange-100 font-bold text-[10px] uppercase tracking-widest">
                  Contacto Directo
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">
                  Comienza a Optimizar tu Patrimonio de Forma Gratuita
                </h2>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm">
                  Rellena el formulario de la derecha. Analizaremos tu caso de forma rigurosa y te agendaré una llamada para realizar tu diagnóstico personal de 48 horas sin compromiso.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Correo de Atención Directa</h5>
                    <a href="mailto:josecarlos@hilolegal.es" className="text-sm font-bold text-slate-900 hover:text-orange-605 break-all">
                      josecarlos@hilolegal.es
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Teléfono Móvil</h5>
                    <a href="tel:+34647506040" className="text-sm font-bold text-slate-900 hover:text-orange-605">
                      +34 647 50 60 40
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Oficina & Cobertura Colectiva</h5>
                    <p className="text-sm font-bold text-slate-900">
                      Calle Regata 3, 1º E, Altea • Directo y Online Nacional
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Note footer */}
              <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                ⚖️ José Carlos Hidalgo Ortega cumple con la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico.
              </p>
            </div>

            {/* Leads submission form */}
            <div className="lg:col-span-7">
              <LeadForm />
            </div>

            {/* Map Section */}
            <div className="lg:col-span-12 mt-12 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" /> Oficina Principal de Altea
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Calle Regata 3, 1º E, 03590 Altea, Alicante (Atención presencial bajo cita previa)
                  </p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Calle%20Regata%203,%2003590%20Altea,%20Alicante" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[10px] uppercase tracking-widest rounded-lg transition-colors leading-none"
                >
                  Abrir en Google Maps
                </a>
              </div>
              <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden border border-slate-100 relative">
                <iframe
                  title="Ubicación de la oficina de José Carlos en Altea"
                  src="https://maps.google.com/maps?q=Calle%20Regata%203,%2003590%20Altea,%20Alicante&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0 rounded-xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Buttons: WhatsApp connection for client actions */}
      <a 
        href="https://api.whatsapp.com/send?phone=34647506040&text=Hola%20José%20Carlos,%20me%20gustaría%20solicitar%20más%20información%20sobre%2520el%20diagnóstico%2520financiero." 
        target="_blank" 
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-350 hover:scale-110" 
        style={{ width: '56px', height: '56px' }}
        title="Contactar por WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.375 3.47 2.234 2.237 3.461 5.216 3.46 8.382-.003 6.525-5.328 11.85-11.859 11.85-2.002-.001-3.971-.508-5.727-1.474L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.86 1.455 5.385 0 9.768-4.385 9.771-9.77C21.28 5.45 16.903 1.071 11.517 1.071c-5.389 0-9.773 4.384-9.776 9.77-.001 1.77.466 3.49 1.354 5.01l-.988 3.597 3.692-.958zm11.532-6.611c-.302-.15-1.786-.88-2.062-.98-.276-.1-.477-.15-.677.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.268-.467-2.414-1.49-1.246-1.112-2.086-2.484-2.33-2.91-.244-.425-.026-.655.124-.805.135-.135.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.631-.927-2.23-.243-.585-.49-.505-.677-.515-.175-.008-.376-.01-.577-.01s-.527.075-.803.375c-.276.3-1.053 1.03-1.053 2.51 0 1.48 1.078 2.91 1.228 3.11s2.122 3.24 5.141 4.55c2.44.1.414 1.7 4.908 2.05.5.05 1.053.475 1.354.55.3.075.677.1 1.128-.025.451-.125 1.787-.73 2.037-1.43.25-.7.25-1.305.175-1.43-.075-.125-.276-.2-.577-.35z"/>
        </svg>
      </a>      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-900 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-bold uppercase tracking-wider">José Carlos Hidalgo</span>
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-1">Asesor Financiero e Hipotecario</span>
            </div>
            
            <div className="flex bg-slate-900 border border-slate-800 p-3 rounded-lg items-center gap-3">
              <Lock className="w-4 h-4 text-orange-400" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Acceso Restringido</span>
                <button 
                  onClick={() => setShowAdmin(true)}
                  className="text-xs font-bold text-white hover:underline uppercase text-left tracking-widest hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Entrada Consultores &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-900">
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-455">Canales Directos</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asesoramiento en Altea, Benidorm, Alicante y videoconferencia nacional.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-455">Contacto Legal</h5>
              <p className="text-xs text-slate-400 font-mono">
                josecarlos@hilolegal.es
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-455">Nota de Cumplimiento</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                De acuerdo con el RGPD, tus datos son tratados con máxima confidencialidad. No compartimos información comercial con terceros sin tu consentimiento expreso por escrito.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between text-[11px] text-slate-500 uppercase tracking-wider gap-4">
            <p>&copy; {new Date().getFullYear()} José Carlos Hidalgo Ortega. Reservados todos los derechos.</p>
            <p>Acreditaciones registradas en el Banco de España y la DGSFP.</p>
          </div>

        </div>
      </footer>

      {/* Admin dashboard popup Modal */}
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}

      {/* Services detailed modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-205 w-full max-w-xl p-6 md:p-8 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-5">
              <div className="inline-flex p-3 bg-orange-50 text-orange-600 rounded-lg">
                <activeModalService.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 block">
                  {activeModalService.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900">
                  {activeModalService.title}
                </h3>
              </div>
              
              <p className="text-sm text-slate-650 leading-relaxed">
                {activeModalService.details}
              </p>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 font-bold text-xs uppercase tracking-widest text-slate-600 transition-colors rounded-lg"
                >
                  Cerrar
                </button>
                <a
                  href="https://calendly.com/jchidalgo/plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveModalService(null)}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest text-center rounded-lg shadow-md"
                >
                  Agendar Estudio gratuito
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
