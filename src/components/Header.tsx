'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              AFRICAMIONS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center" style={{ gap: '32px' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#0177ED] hover:bg-[#0165CC] transition-all"
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginLeft: '40px'
              }}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[9999]"
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className="md:hidden fixed top-0 right-0 z-[10000] h-full bg-white"
        style={{
          width: '85vw',
          maxWidth: '350px',
          boxShadow: isMenuOpen ? '-10px 0 40px rgba(0, 0, 0, 0.15)' : 'none',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          padding: '32px 24px',
        }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#111827] hover:text-[#0177ED] transition-colors"
              style={{
                padding: '16px 0',
                fontSize: '1.1rem',
                fontWeight: 500,
                borderBottom: '1px solid #F3F4F6',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/devis"
          className="inline-flex items-center justify-center w-full text-sm font-semibold text-white bg-[#0177ED] hover:bg-[#0165CC] transition-all"
          style={{
            padding: '16px 24px',
            borderRadius: '8px',
            marginTop: '32px',
            fontSize: '1rem',
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          Demander un devis
        </Link>
      </div>
    </header>
  );
}
