'use client';

import Link from 'next/link';
import { getWhatsAppLink, whatsappMessages } from '@/utils/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#111827' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        {/* 3-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 1fr',
            gap: '64px',
            alignItems: 'start'
          }}
          className="footer-grid"
        >
          {/* Column 1: Infos entreprise */}
          <div>
            <h3
              className="text-white"
              style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                marginBottom: '16px'
              }}
            >
              AFRICAMIONS
            </h3>
            <p style={{
              color: '#9CA3AF',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Camions et véhicules industriels neufs ou rénovés pour l&apos;Afrique francophone.
            </p>
            <p style={{
              color: '#6B7280',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}>
              Opéré par Chongqing Chuanyu Ji International Trade Co., Ltd.
            </p>
            <p style={{
              fontWeight: '700',
              color: 'white',
              fontSize: '0.9rem'
            }}>
              HOWO • SHACMAN
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              className="text-white uppercase"
              style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '24px'
              }}
            >
              Navigation
            </h4>
            <nav>
              <Link
                href="/"
                className="hover:text-white transition-colors block"
                style={{
                  color: '#9CA3AF',
                  fontSize: '0.95rem',
                  marginBottom: '12px'
                }}
              >
                Accueil
              </Link>
              <Link
                href="/catalogue"
                className="hover:text-white transition-colors block"
                style={{
                  color: '#9CA3AF',
                  fontSize: '0.95rem',
                  marginBottom: '12px'
                }}
              >
                Catalogue
              </Link>
              <Link
                href="/a-propos"
                className="hover:text-white transition-colors block"
                style={{
                  color: '#9CA3AF',
                  fontSize: '0.95rem',
                  marginBottom: '12px'
                }}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors block"
                style={{
                  color: '#9CA3AF',
                  fontSize: '0.95rem',
                  marginBottom: '12px'
                }}
              >
                Contact
              </Link>
              <Link
                href="/devis"
                className="hover:text-white transition-colors block"
                style={{
                  color: '#9CA3AF',
                  fontSize: '0.95rem'
                }}
              >
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              className="text-white uppercase"
              style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '24px'
              }}
            >
              Contact
            </h4>

            {/* WhatsApp */}
            <div className="flex items-start gap-3 mb-5 justify-center md:justify-start">
              <svg
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#0177ED',
                  marginTop: '2px',
                  flexShrink: 0
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '2px' }}>
                  WhatsApp
                </p>
                <a
                  href={getWhatsAppLink(whatsappMessages.footer)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0177ED] transition-colors"
                  style={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                  }}
                >
                  +86 187 1634 2426
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 mb-5 justify-center md:justify-start">
              <svg
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#0177ED',
                  marginTop: '2px',
                  flexShrink: 0
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '2px' }}>
                  Email
                </p>
                <a
                  href="mailto:contact@africamions.com"
                  className="hover:text-[#0177ED] transition-colors"
                  style={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                  }}
                >
                  contact@africamions.com
                </a>
              </div>
            </div>

            {/* Site web */}
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <svg
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#0177ED',
                  marginTop: '2px',
                  flexShrink: 0
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <div>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', marginBottom: '2px' }}>
                  Site web
                </p>
                <span style={{
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>
                  www.africamions.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid #1F2937',
            textAlign: 'center'
          }}
        >
          <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>
            &copy; {currentYear} Africamions. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
