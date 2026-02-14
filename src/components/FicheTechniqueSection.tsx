'use client';

import { useState } from 'react';
import PDFViewerModal from './PDFViewerModal';

export default function FicheTechniqueSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div
            className="r-fiche-box"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '60px 40px',
              background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              textAlign: 'center',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                background: '#EBF5FF',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0177ED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#0A0A0A',
                marginBottom: '12px',
              }}
            >
              Notre catalogue complet
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '1.1rem',
                color: '#6B7280',
                maxWidth: '500px',
                margin: '0 auto 32px auto',
                lineHeight: 1.6,
              }}
            >
              Découvrez les spécifications techniques détaillées de tous nos camions et véhicules industriels.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: '16px' }}
            >
              {/* Primary - Consulter */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: '#0177ED',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(1, 119, 237, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0165CC';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(1, 119, 237, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0177ED';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(1, 119, 237, 0.25)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Consulter la fiche technique
              </button>

              {/* Secondary - Télécharger */}
              <a
                href="/documents/Fiche_technique_Africamions.pdf"
                download
                className="w-full sm:w-auto"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'white',
                  color: '#374151',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '1.5px solid #D1D5DB',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0177ED';
                  e.currentTarget.style.color = '#0177ED';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.color = '#374151';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <PDFViewerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
