'use client';

import { useState } from 'react';
import PDFViewerModal from './PDFViewerModal';

export default function CataloguePDFBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="r-banner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '24px',
          marginBottom: '32px',
          borderRadius: '12px',
          background: '#F0F7FF',
          border: '1px solid #BFDBFE',
        }}
      >
        {/* Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1E40AF', fontSize: '0.95rem', fontWeight: 500 }}>
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          <span>
            Consultez notre fiche technique complète avec toutes les spécifications de nos véhicules.
          </span>
        </div>

        {/* Buttons */}
        <div className="r-banner-buttons" style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: '#0177ED',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0165CC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0177ED';
            }}
          >
            Voir la fiche technique
          </button>
          <a
            href="/documents/Fiche_technique_Africamions.pdf"
            download
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: 'white',
              color: '#374151',
              border: '1.5px solid #D1D5DB',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0177ED';
              e.currentTarget.style.color = '#0177ED';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#D1D5DB';
              e.currentTarget.style.color = '#374151';
            }}
          >
            Télécharger
          </a>
        </div>
      </div>

      <PDFViewerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
