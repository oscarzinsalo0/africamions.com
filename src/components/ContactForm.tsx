'use client';

import { useState } from 'react';
import { getCountryByCode, Country, francophoneCountries, africaCountries, worldCountries } from '@/data/countries';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = getCountryByCode(countryCode);
    setSelectedCountry(country || null);
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      phone: '' // Reset phone when country changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Combine dial code with phone number
    const fullPhone = selectedCountry && formData.phone
      ? `${selectedCountry.dial} ${formData.phone}`
      : formData.phone;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          country: selectedCountry?.name || formData.country
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          country: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSelectedCountry(null);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    'Demande d\'information',
    'Demande de devis',
    'Service après-vente',
    'Partenariat',
    'Autre'
  ];

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    backgroundColor: 'white'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#374151',
    fontSize: '0.875rem'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {submitStatus === 'success' && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px'
          }}
        >
          <div className="flex items-start" style={{ gap: '12px' }}>
            <svg
              style={{ width: '20px', height: '20px', color: '#22C55E', marginTop: '2px', flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#166534' }}>Message envoyé !</h4>
              <p style={{ fontSize: '0.875rem', color: '#15803D', marginTop: '4px' }}>
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px'
          }}
        >
          <div className="flex items-start" style={{ gap: '12px' }}>
            <svg
              style={{ width: '20px', height: '20px', color: '#EF4444', marginTop: '2px', flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#991B1B' }}>Erreur lors de l&apos;envoi</h4>
              <p style={{ fontSize: '0.875rem', color: '#B91C1C', marginTop: '4px' }}>
                Veuillez réessayer ou nous contacter directement.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
        {/* Nom */}
        <div>
          <label htmlFor="name" style={labelStyle}>
            Nom complet <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="votre@email.com"
          />
        </div>

        {/* Pays */}
        <div>
          <label htmlFor="country" style={labelStyle}>
            Pays
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            style={inputStyle}
          >
            <option value="">Sélectionnez votre pays</option>
            <optgroup label="🌍 Afrique francophone">
              {francophoneCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🌍 Autres pays africains">
              {africaCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🌐 Tous les autres pays">
              {worldCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Téléphone avec préfixe */}
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Téléphone
          </label>
          <div
            style={{
              display: 'flex',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.2s ease'
            }}
            className="phone-input-container"
          >
            {/* Préfixe */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 16px',
                backgroundColor: '#F9FAFB',
                borderRight: '1px solid #E5E7EB',
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                minWidth: '90px'
              }}
            >
              {selectedCountry ? (
                <>
                  <span style={{ fontSize: '1.2rem' }}>{selectedCountry.flag}</span>
                  <span>{selectedCountry.dial}</span>
                </>
              ) : (
                <span style={{ color: '#9CA3AF' }}>+XXX</span>
              )}
            </div>
            {/* Input */}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={selectedCountry ? "XX XXX XX XX" : "Sélectionnez un pays"}
              disabled={!selectedCountry}
              style={{
                flex: 1,
                padding: '14px 16px',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                backgroundColor: selectedCountry ? 'white' : '#F9FAFB'
              }}
            />
          </div>
        </div>

        {/* Sujet */}
        <div className="md:col-span-2">
          <label htmlFor="subject" style={labelStyle}>
            Sujet <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Sélectionnez un sujet</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" style={labelStyle}>
            Message <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            style={{
              ...inputStyle,
              minHeight: '120px',
              resize: 'none'
            }}
            placeholder="Votre message..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          width: '100%',
          padding: '16px 24px',
          backgroundColor: '#0177ED',
          borderRadius: '8px',
          fontSize: '1rem',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          'Envoyer le message'
        )}
      </button>

      <style jsx>{`
        .phone-input-container:focus-within {
          border-color: #0177ED;
          box-shadow: 0 0 0 3px rgba(1, 119, 237, 0.1);
        }
      `}</style>
    </form>
  );
}
