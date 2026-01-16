import React, { useState } from 'react';
import { UserLead } from '../types';
import { Button } from './Button';
import { LockKeyhole } from 'lucide-react';

interface LeadGateProps {
  onUnlock: (lead: UserLead) => void;
}

export const LeadGate: React.FC<LeadGateProps> = ({ onUnlock }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Nome muito curto.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    // Remove non-digits for validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) newErrors.phone = 'Telefone inválido (mínimo 10 dígitos).';
    if (!formData.consent) newErrors.consent = 'Você precisa concordar para continuar.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onUnlock({
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        consentMarketing: formData.consent,
        createdAt: Date.now(),
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 animate-fade-in-up">
      <div className="bg-indigo-50 p-4 rounded-full mb-6">
        <LockKeyhole className="w-8 h-8 text-brand-primary" />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Caminho do Designer
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Descubra se seu perfil é Explorador, Artístico ou Analítico e como evoluir na carreira.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label>
          <input
            type="tel"
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 text-brand-primary rounded border-gray-300 focus:ring-brand-primary"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <span className="text-sm text-gray-500 leading-tight">
              Concordo em receber comunicações e conteúdos. Posso cancelar a qualquer momento.
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-xs mt-1 ml-8">{errors.consent}</p>}
        </div>

        <Button type="submit" fullWidth className="mt-6">
          Desbloquear Teste
        </Button>
      </form>

      <div className="mt-6 text-center">
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Política de Privacidade</a>
      </div>
    </div>
  );
};