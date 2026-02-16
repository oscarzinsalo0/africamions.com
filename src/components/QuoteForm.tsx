'use client';

import { useState, useRef } from 'react';
import { products } from '@/data/products';
import { getCountryByCode, Country, francophoneCountries, africaCountries, worldCountries } from '@/data/countries';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface QuoteFormProps {
  preselectedModel?: string;
}

export default function QuoteForm({ preselectedModel }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    country: '',
    phone: '',
    email: '',
    model: preselectedModel || '',
    version: '',
    quantity: 1,
    message: ''
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formTopRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
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
    const fullPhone = selectedCountry ? `${selectedCountry.dial} ${formData.phone}` : formData.phone;

    try {
      const response = await fetch('/api/quote', {
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
          fullName: '',
          company: '',
          country: '',
          phone: '',
          email: '',
          model: '',
          version: '',
          quantity: 1,
          message: ''
        });
        setSelectedCountry(null);
        setTimeout(() => {
          formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setSubmitStatus('error');
        setTimeout(() => {
          formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => {
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const whatsappConfirmMessage = `Bonjour Africamions,

Je viens de soumettre une demande de devis sur votre site africamions.com.

Je reste disponible pour échanger sur les détails de ma commande.

Cordialement.`;

  // Confirmation page after successful submission
  if (submitStatus === 'success') {
    return (
      <div ref={formTopRef} style={{ textAlign: 'center', padding: '40px 20px' }}>
        {/* Success icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#F0FDF4',
            border: '2px solid #BBF7D0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}
        >
          <svg
            style={{ width: '40px', height: '40px', color: '#22C55E' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px'
          }}
        >
          Demande envoyée avec succès
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1rem',
            color: '#6B7280',
            lineHeight: '1.7',
            maxWidth: '480px',
            margin: '0 auto 32px'
          }}
        >
          Votre demande de devis a bien été enregistrée. Notre équipe commerciale l&apos;examine et vous contactera dans les plus brefs délais.
        </p>

        {/* Separator */}
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#E5E7EB',
            margin: '0 auto 32px'
          }}
        />

        {/* WhatsApp CTA */}
        <p
          style={{
            fontSize: '0.925rem',
            color: '#374151',
            fontWeight: '500',
            marginBottom: '16px'
          }}
        >
          Besoin d&apos;une réponse rapide ? Contactez-nous directement :
        </p>

        <a
          href={getWhatsAppLink(whatsappConfirmMessage)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.2px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1EBE5A';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#25D366';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* WhatsApp icon */}
          <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Échanger sur WhatsApp
        </a>

        <p
          style={{
            fontSize: '0.8rem',
            color: '#9CA3AF',
            marginTop: '24px',
            lineHeight: '1.6'
          }}
        >
          Un conseiller dédié vous répondra personnellement.
        </p>

        {/* New quote button */}
        <button
          onClick={() => setSubmitStatus('idle')}
          style={{
            marginTop: '32px',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#0177ED',
            border: '1px solid #0177ED',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#EFF6FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div ref={formTopRef} />

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
                Veuillez réessayer ou nous contacter directement par WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
        {/* Nom complet */}
        <div>
          <label htmlFor="fullName" style={labelStyle}>
            Nom complet <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Votre nom complet"
          />
        </div>

        {/* Société */}
        <div>
          <label htmlFor="company" style={labelStyle}>
            Société <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Nom de votre société"
          />
        </div>

        {/* Pays */}
        <div>
          <label htmlFor="country" style={labelStyle}>
            Pays <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            required
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
            Téléphone / WhatsApp <span style={{ color: '#EF4444' }}>*</span>
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
              required
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

        {/* Modèle */}
        <div>
          <label htmlFor="model" style={labelStyle}>
            Modèle demandé <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Sélectionnez un modèle</option>
            {products.map(product => (
              <option key={product.id} value={product.name}>{product.name}</option>
            ))}
            <option value="Autre">Autre (préciser dans le message)</option>
          </select>
        </div>

        {/* Version souhaitée */}
        <div>
          <label htmlFor="version" style={labelStyle}>
            Version souhaitée <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Sélectionnez une version</option>
            <option value="neuf">Neuf</option>
            <option value="renove">Rénové</option>
            <option value="les_deux">Les deux (Neuf et Rénové)</option>
          </select>
        </div>

        {/* Quantité */}
        <div>
          <label htmlFor="quantity" style={labelStyle}>
            Quantité <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            style={inputStyle}
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" style={labelStyle}>
            Message / Spécifications
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              ...inputStyle,
              minHeight: '120px',
              resize: 'none'
            }}
            placeholder="Précisez vos besoins spécifiques (couleur, options, destination...)"
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
          'Envoyer ma demande de devis'
        )}
      </button>

      <p style={{ fontSize: '0.75rem', color: '#6B7280', textAlign: 'center' }}>
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe commerciale.
      </p>

      <style jsx>{`
        .phone-input-container:focus-within {
          border-color: #0177ED;
          box-shadow: 0 0 0 3px rgba(1, 119, 237, 0.1);
        }
      `}</style>
    </form>
  );
}
