import React, { useState } from 'react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle2, ChevronDown, Check, RefreshCw } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Diagnóstico Financiero Inicial',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    'Diagnóstico Financiero Inicial',
    'Nueva Hipoteca o Mejora de Hipoteca',
    'Protección de Ingresos (Autónomos)',
    'Planes de Ahorro y Jubilación',
    'Administración de Fincas (Alicante)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Por favor, completa todos los campos requeridos (Nombre, Teléfono e Email).');
      setLoading(false);
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Por favor, indica un correo electrónico válido.');
      setLoading(false);
      return;
    }

    try {
      const leadsRef = collection(db, 'leads');
      const leadId = doc(leadsRef).id; // Generates unique ID client-side

      // Construct lead object adhering strictly to the firestore rule constraints
      const leadData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        message: formData.message.trim() || 'Sin comentarios adicionales',
        createdAt: serverTimestamp(), // MANDATORY for safety net rule validation
        status: 'new'
      };

      await setDoc(doc(db, 'leads', leadId), leadData);
      setSuccess(true);
    } catch (e: any) {
      console.error('Error saving lead:', e);
      setError('Hubo un contratiempo al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => {
          setSuccess(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            service: 'Diagnóstico Financiero Inicial',
            message: ''
          });
        }}></div>
        
        {/* Modal Content */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-orange-50 border border-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              ¡Muchas gracias!
            </h3>
            <p className="text-sm font-medium text-slate-700">
              En breve me pondré en contacto contigo
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-2">
              He registrado tus datos del diagnóstico gratuito correctamente para dar prioridad a tu llamada.
            </p>
          </div>
          
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                service: 'Diagnóstico Financiero Inicial',
                message: ''
              });
            }}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-md cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 p-6 md:p-10 shadow-xl space-y-6">
      <div className="border-b border-zinc-100 pb-4 mb-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-zinc-900">Agenda tu diagnóstico 0€</h3>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest leading-relaxed">
          Recibe un informe personalizado sobre tu salud financiera e hipotecas sin coste.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 text-xs font-semibold rounded">
          {error}
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name input */}
        <div className="space-y-1.5ClassName">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Nombre Completo <span className="text-orange-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej. José Carlos"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-zinc-900 transition-colors"
          />
        </div>

        {/* Phone input */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Teléfono Móvil <span className="text-orange-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Ej. +34 647 50 60 40"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-zinc-900 transition-colors"
          />
        </div>
      </div>

      {/* Email input */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Correo Electrónico <span className="text-orange-600">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Ej. hidalgo.j.carlos@gmail.com"
          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-zinc-900 transition-colors"
        />
      </div>

      {/* Select Service */}
      <div className="space-y-1.5 relative">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          ¿En qué área requieres ayuda?
        </label>
        <div className="relative">
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-zinc-900 appearance-none cursor-pointer transition-colors"
          >
            {services.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Textarea message */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Describe brevemente tu objetivo financiero (Opcional)
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Ej. Quiero refinanciar mi hipoteca de tipo variable para pasarla a fija / Deseo calcular mi jubilación..."
          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-zinc-900 transition-colors resize-none"
        />
      </div>

      {/* Privacy Notice */}
      <p className="text-[10px] text-zinc-400 leading-relaxed uppercase tracking-wider">
        Al hacer clic en enviar, consientes el tratamiento de tus datos para esta asesoría gratuita. Garantizo 100% de confidencialidad de acuerdo con el RGPD.
      </p>

      {/* Action Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50 rounded-lg shadow-md border border-orange-650"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Procesando Solicitud...
          </>
        ) : (
          'Agendar mi diagnóstico gratuito'
        )}
      </button>
    </form>
  );
}
