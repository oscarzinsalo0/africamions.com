import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FicheTechniqueSection from '@/components/FicheTechniqueSection';
import { getWhatsAppLink, whatsappMessages } from '@/utils/whatsapp';

export default function Home() {
  // Afficher tous les 20 produits
  const featuredProducts = products;

  return (
    <>
      {/* Hero Section - Premium E-commerce Design */}
      <section
        className="relative min-h-screen flex items-center hero-pattern r-hero"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 50%, #E8F0FE 100%)',
          paddingTop: '80px',
          paddingBottom: '100px'
        }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 items-center r-gap-lg" style={{ gap: '64px' }}>
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge Exportateur */}
              <div
                className="inline-flex items-center bg-white mb-8 r-hero-badge"
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <span
                  className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse-dot"
                  style={{ marginRight: '10px' }}
                ></span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Exportateur direct usine
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  color: '#0A0A0A',
                  letterSpacing: '-0.02em'
                }}
              >
                La qualité nous <span style={{ color: '#0177ED' }}>connecte</span>
              </h1>

              {/* Subtitle */}
              <p
                className="r-hero-subtitle"
                style={{
                  fontSize: '1.2rem',
                  color: '#6B7280',
                  lineHeight: '1.6',
                  maxWidth: '500px',
                  marginTop: '20px'
                }}
              >
                Camions et véhicules industriels neufs ou rénovés pour l&apos;Afrique francophone. Accès direct aux meilleures usines chinoises.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start" style={{ marginTop: '32px', gap: '16px' }}>
                <Link
                  href="/catalogue"
                  className="inline-flex items-center justify-center text-white font-semibold hero-btn-primary w-full sm:w-auto"
                  style={{
                    height: '56px',
                    padding: '0 32px',
                    background: '#0177ED',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 14px rgba(1, 119, 237, 0.25)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Voir nos modèles
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center font-semibold hero-btn-secondary w-full sm:w-auto"
                  style={{
                    height: '56px',
                    padding: '0 32px',
                    background: 'white',
                    color: '#111827',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: '1.5px solid #D1D5DB',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Demander un devis
                </Link>
              </div>

              {/* Stats */}
              <div
                className="flex items-center justify-center lg:justify-start r-stats"
                style={{ marginTop: '48px', gap: '48px' }}
              >
                <div>
                  <p className="r-stats-number" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0A0A0A' }}>900+</p>
                  <p className="r-stats-label" style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '4px' }}>Véhicules vendus</p>
                </div>
                <div className="r-stats-divider" style={{ width: '1px', height: '48px', background: '#E5E7EB' }}></div>
                <div>
                  <p className="r-stats-number" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0A0A0A' }}>20+</p>
                  <p className="r-stats-label" style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '4px' }}>Pays desservis</p>
                </div>
                <div className="r-stats-divider" style={{ width: '1px', height: '48px', background: '#E5E7EB' }}></div>
                <div>
                  <p className="r-stats-number" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0A0A0A' }}>10+</p>
                  <p className="r-stats-label" style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '4px' }}>Experts</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  borderRadius: '24px',
                  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)'
                }}
              >
                <Image
                  src="/images/hero-truck.jpg"
                  alt="Camion HOWO - Africamions"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Badge Prix usine - Top Right */}
              <div
                className="absolute animate-fade-in-up animate-delay-300 hidden md:block"
                style={{
                  top: '-20px',
                  right: '-20px',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: '#EBF5FF'
                    }}
                  >
                    <svg className="w-5 h-5" style={{ color: '#0177ED' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem', color: '#111827' }}>Prix usine</p>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Sans intermédiaires</p>
                  </div>
                </div>
              </div>

              {/* Badge Qualité garantie - Bottom Left */}
              <div
                className="absolute animate-fade-in-up animate-delay-500 hidden md:block"
                style={{
                  bottom: '-24px',
                  left: '-24px',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: '#ECFDF5'
                    }}
                  >
                    <svg className="w-5 h-5" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem', color: '#111827' }}>Qualité garantie</p>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Véhicules inspectés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-50 border-y border-gray-200" style={{ padding: '80px 0' }}>
        <div className="container-custom">
          <p
            className="text-center uppercase"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '3px',
              color: '#6B7280',
              fontWeight: '600',
              marginBottom: '40px'
            }}
          >
            Nos marques partenaires
          </p>
          <div className="flex justify-center items-center r-brands" style={{ gap: '80px' }}>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#111827] r-brands-title">HOWO</h3>
              <p className="text-sm text-[#6B7280] mt-2">SINOTRUK</p>
            </div>
            <div className="h-16 w-px bg-gray-300 r-brands-separator"></div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#111827] r-brands-title">SHACMAN</h3>
              <p className="text-sm text-[#6B7280] mt-2">Shaanxi Auto</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Africamions */}
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <h2 className="section-title">Pourquoi choisir Africamions ?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem', color: '#6B7280' }}>
              Votre partenaire de confiance pour l&apos;importation de véhicules industriels en Afrique
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4"
            style={{ gap: '24px' }}
          >
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: 'Qualité garantie',
                description: 'Chaque véhicule subit un processus de rénovation rigoureux en 8 étapes'
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                title: 'Exportateur direct',
                description: 'Accès direct aux usines chinoises pour les meilleurs prix'
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: 'Prix compétitifs',
                description: 'Tarifs usine sans intermédiaires pour une meilleure rentabilité'
              },
              {
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                title: 'Support dédié',
                description: 'Accompagnement personnalisé de la commande à la livraison'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center bg-white card-hover"
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-5"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#EBF5FF',
                    borderRadius: '50%'
                  }}
                >
                  <svg className="w-7 h-7 text-[#0177ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center" style={{ gap: '16px', marginBottom: '56px' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '12px' }}>Nos véhicules</h2>
              <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
                Découvrez notre sélection de camions et véhicules industriels
              </p>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex items-center text-[#0177ED] font-semibold hover:underline"
              style={{ fontSize: '1rem' }}
            >
              Voir tout le catalogue
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fiche Technique Section */}
      <FicheTechniqueSection />

      {/* Process Section */}
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <h2 className="section-title">Processus d&apos;importation</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem', color: '#6B7280' }}>
              Un accompagnement complet pour votre projet d&apos;importation
            </p>
          </div>

          <div className="relative">
            {/* Connecting line - desktop horizontal */}
            <div
              className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200"
              style={{
                left: '12%',
                right: '12%',
                zIndex: 0
              }}
            ></div>

            {/* Desktop: 4 columns / Mobile: timeline */}
            <div className="r-process-grid grid lg:grid-cols-4 relative" style={{ gap: '32px' }}>
              {[
                { step: 1, title: 'Demande de devis', desc: 'Sélectionnez vos modèles et envoyez votre demande de devis personnalisé', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { step: 2, title: 'Offre commerciale', desc: 'Recevez une offre détaillée avec prix FOB, photos et spécifications', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
                { step: 3, title: 'Confirmation', desc: 'Validez la commande et effectuez le paiement selon les termes convenus', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { step: 4, title: 'Expédition', desc: "Suivi de l'expédition maritime jusqu'au port de destination", icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' }
              ].map((item, index) => (
                <div key={item.step} className="r-process-step text-center relative z-10">
                  {/* Mobile: vertical line between steps */}
                  {index < 3 && (
                    <div className="r-process-line lg:hidden" />
                  )}
                  <div
                    className="r-process-circle flex items-center justify-center mx-auto mb-4 text-white font-bold bg-[#0177ED]"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      fontSize: '1.125rem',
                      boxShadow: '0 4px 14px rgba(1, 119, 237, 0.3)'
                    }}
                  >
                    {item.step}
                  </div>
                  {/* Icon for mobile */}
                  <div className="r-process-icon hidden">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0177ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="r-process-title text-lg font-semibold text-[#111827] mb-2">{item.title}</h3>
                  <p className="r-process-desc text-sm text-[#6B7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden r-section-sm"
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)'
        }}
      >
        <div className="container-custom relative z-10">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2
              className="text-white font-bold mb-6 r-cta-title"
              style={{ fontSize: '2.5rem' }}
            >
              Prêt à commander vos véhicules ?
            </h2>
            <p
              className="mb-10"
              style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.7'
              }}
            >
              Contactez-nous dès maintenant pour recevoir une offre personnalisée adaptée à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '16px' }}>
              <Link
                href="/devis"
                className="btn-primary w-full sm:w-auto"
              >
                Demander un devis gratuit
              </Link>
              <a
                href={getWhatsAppLink(whatsappMessages.cta)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-white font-semibold transition-all w-full sm:w-auto"
                style={{
                  padding: '14px 28px',
                  borderRadius: '8px',
                  backgroundColor: '#25D366',
                  fontSize: '1rem',
                  gap: '10px'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
