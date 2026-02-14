'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuoteForm from '@/components/QuoteForm';
import { getWhatsAppLink, whatsappMessages } from '@/utils/whatsapp';

function QuoteFormWrapper() {
  const searchParams = useSearchParams();
  const model = searchParams.get('model') || '';

  return <QuoteForm preselectedModel={model} />;
}

export default function QuotePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-gray-50 border-b border-gray-200"
        style={{ paddingTop: '100px', paddingBottom: '48px' }}
      >
        <div className="container-custom">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1
              className="font-bold text-[#111827] mb-4 r-page-title"
              style={{ fontSize: '2.5rem', lineHeight: '1.2' }}
            >
              Demander un devis
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7' }}>
              Remplissez le formulaire ci-dessous et recevez une offre personnalisée sous 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="r-section-sm" style={{ padding: '80px 0 100px' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Form - 2 columns */}
            <div className="lg:col-span-2">
              <div
                className="bg-white"
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  maxWidth: '800px'
                }}
              >
                <Suspense fallback={<div className="animate-pulse bg-gray-100 h-96 rounded-xl" />}>
                  <QuoteFormWrapper />
                </Suspense>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              {/* Why Choose Us */}
              <div
                className="bg-gray-50"
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}
              >
                <h3
                  className="font-semibold text-[#111827] mb-4"
                  style={{ fontSize: '1rem' }}
                >
                  Pourquoi nous choisir ?
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Exportateur direct usine',
                    'Véhicules inspectés et rénovés',
                    'Prix compétitifs sans intermédiaires',
                    'Accompagnement personnalisé',
                    'Livraison internationale'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0"
                        style={{ width: '20px', height: '20px', color: '#0177ED', marginTop: '2px', marginRight: '12px' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Direct */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)',
                  marginBottom: '24px'
                }}
              >
                <h3
                  className="text-white font-semibold mb-3"
                  style={{ fontSize: '1rem' }}
                >
                  Besoin d&apos;une réponse rapide ?
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '16px',
                    lineHeight: '1.6'
                  }}
                >
                  Contactez-nous directement sur WhatsApp pour une réponse immédiate.
                </p>
                <a
                  href={getWhatsAppLink(whatsappMessages.cta)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full font-semibold text-[#111827] bg-white hover:bg-gray-100 transition-colors"
                  style={{
                    padding: '14px 20px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    gap: '10px'
                  }}
                >
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  +86 187 1634 2426
                </a>
              </div>

              {/* Process Info */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <h3
                  className="font-semibold text-[#111827] mb-4"
                  style={{ fontSize: '1rem' }}
                >
                  Comment ça marche ?
                </h3>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { title: 'Envoyez votre demande', desc: 'Remplissez le formulaire avec vos besoins' },
                    { title: 'Recevez votre devis', desc: 'Notre équipe vous répond sous 24h' },
                    { title: 'Validez et commandez', desc: 'Confirmez votre commande et les modalités' }
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className="flex items-center justify-center flex-shrink-0 text-white font-bold bg-[#0177ED]"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          fontSize: '0.75rem',
                          marginRight: '12px'
                        }}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-[#111827]" style={{ fontSize: '0.875rem' }}>{step.title}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
