import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Africamions, votre partenaire pour l\'importation de camions et véhicules industriels en Afrique. Opéré par Chongqing Chuanyu Ji International Trade Co., Ltd.',
};

export default function AboutPage() {
  const steps = [
    {
      number: '01',
      title: 'Démontage',
      description: 'Inspection préliminaire du véhicule, y compris inspection visuelle et dommages internes.'
    },
    {
      number: '02',
      title: 'Nettoyage',
      description: 'Classer les composants démontés selon le matériau. Nettoyer soigneusement avec différents agents de nettoyage.'
    },
    {
      number: '03',
      title: 'Traitement antirouille',
      description: 'Vérifier l\'état de rouille de la carrosserie et du châssis, et éliminer soigneusement la rouille.'
    },
    {
      number: '04',
      title: 'Maintenance du châssis',
      description: 'Vérifier le châssis du véhicule, y compris la réparation des zones problématiques.'
    },
    {
      number: '05',
      title: 'Tôlerie',
      description: 'Assurer la planéité de la surface de la carrosserie pour les bosses, rayures et autres imperfections.'
    },
    {
      number: '06',
      title: 'Peinture',
      description: 'Avant peinture, effectuer un sablage pour améliorer l\'adhérence et la protection antirouille.'
    },
    {
      number: '07',
      title: 'Assemblage',
      description: 'Réinstaller le moteur et la boîte de vitesses rénovés sur le châssis, fixer et connecter.'
    },
    {
      number: '08',
      title: 'Habillage',
      description: 'Sélectionner la superstructure appropriée selon les besoins du client et peindre l\'ensemble du véhicule.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-gray-50 border-b border-gray-200"
        style={{ paddingTop: '100px', paddingBottom: '48px' }}
      >
        <div className="container-custom">
          <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1
              className="font-bold text-[#111827] mb-4 r-page-title"
              style={{ fontSize: '2.5rem', lineHeight: '1.2' }}
            >
              À propos d&apos;Africamions
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7' }}>
              Votre partenaire de confiance pour l&apos;importation de camions et véhicules industriels
              de qualité en Afrique francophone.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center bg-white mb-6"
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <span style={{ color: '#0177ED', marginRight: '8px' }}>●</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0177ED' }}>
                  Notre histoire
                </span>
              </div>

              <h2
                className="font-bold text-[#0A0A0A]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  marginBottom: '24px'
                }}
              >
                Qui sommes-nous ?
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  <strong className="text-[#111827]">AFRICAMIONS</strong>, opéré par{' '}
                  <strong className="text-[#111827]">Chongqing Chuanyu Ji International Trade Co., Ltd.</strong>,
                  est spécialisé dans la rénovation d&apos;une large gamme de véhicules commerciaux,
                  y compris les camions bennes, tracteurs et citernes.
                </p>
                <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  En tirant parti de notre expertise technique et de notre vaste expérience,
                  nous livrons des solutions haute performance et durables, adaptées à vos besoins spécifiques.
                </p>
                <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  Nous sommes <strong className="text-[#111827]">exportateur direct usine</strong>,
                  ce qui nous permet de vous offrir les meilleurs prix du marché sans intermédiaires.
                </p>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 mt-10 pt-8 border-t border-gray-200 gap-4 sm:gap-8"
              >
                <div className="text-center">
                  <p className="font-bold text-[#0177ED] r-about-stat" style={{ fontSize: '2.5rem' }}>2 000</p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Surface (m²)</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#0177ED] r-about-stat" style={{ fontSize: '2.5rem' }}>1 500</p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Volume de ventes</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#0177ED] r-about-stat" style={{ fontSize: '2.5rem' }}>80+</p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Personnel</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/3',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
              }}
            >
              <Image
                src="/images/about-hero.jpg"
                alt="Africamions - Centre de rénovation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <h2
              className="font-bold text-[#111827]"
              style={{ fontSize: '2rem', marginBottom: '16px' }}
            >
              Notre culture d&apos;entreprise
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
              La qualité nous connecte
            </p>
          </div>

          <div className="grid md:grid-cols-3" style={{ gap: '24px' }}>
            {[
              {
                title: 'Vision',
                description: 'Fournir des véhicules commerciaux d\'occasion de haute qualité pour la croissance logistique mondiale.'
              },
              {
                title: 'Mission',
                description: 'Offrir des solutions de transport de fret premium en créant des partenariats durables et une valeur exceptionnelle.'
              },
              {
                title: 'Valeurs',
                description: 'Fournir des véhicules commerciaux d\'occasion de haute qualité pour la croissance logistique en Afrique francophone.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-center"
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <h3
                  className="font-semibold text-[#111827] mb-3"
                  style={{ fontSize: '1.25rem' }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#6B7280', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Vehicles Section */}
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            {/* Badge */}
            <div
              className="inline-flex items-center bg-white mb-4"
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: '1px solid #E5E7EB'
              }}
            >
              <span style={{ color: '#0177ED', marginRight: '8px' }}>●</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0177ED' }}>
                Véhicules neufs
              </span>
            </div>
            <h2
              className="font-bold text-[#111827]"
              style={{ fontSize: '2rem', marginBottom: '16px' }}
            >
              Véhicules neufs – Direct usine
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto' }}>
              Nous proposons également des camions neufs des marques HOWO et SHACMAN,
              directement importés de Chine avec garantie constructeur.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
            {[
              {
                title: 'Garantie constructeur',
                description: 'Tous nos véhicules neufs bénéficient de la garantie officielle du fabricant.'
              },
              {
                title: 'Certification d\'origine',
                description: 'Documents d\'origine et certificats de conformité fournis avec chaque véhicule.'
              },
              {
                title: 'Prix usine',
                description: 'En tant qu\'exportateur direct, nous vous offrons les meilleurs prix sans intermédiaires.'
              },
              {
                title: 'Personnalisation',
                description: 'Configuration sur mesure selon vos besoins : couleur, équipements, superstructure.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white"
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <h3
                  className="font-semibold text-[#111827] mb-2"
                  style={{ fontSize: '1.125rem' }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renovation Process */}
      <section className="bg-gray-50 r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            {/* Badge */}
            <div
              className="inline-flex items-center bg-white mb-4"
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: '1px solid #E5E7EB'
              }}
            >
              <span style={{ color: '#0177ED', marginRight: '8px' }}>●</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0177ED' }}>
                Véhicules rénovés
              </span>
            </div>
            <h2
              className="font-bold text-[#111827]"
              style={{ fontSize: '2rem', marginBottom: '16px' }}
            >
              Processus de rénovation en 8 étapes
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto' }}>
              Notre expertise en rénovation garantit des véhicules d&apos;occasion
              remis à neuf selon des standards stricts de qualité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white"
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <span
                  className="font-bold"
                  style={{ fontSize: '2.5rem', color: 'rgba(1, 119, 237, 0.2)' }}
                >
                  {step.number}
                </span>
                <h3
                  className="font-semibold text-[#111827] mt-2 mb-2"
                  style={{ fontSize: '1.125rem' }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee Section */}
      <section
        className="r-section-sm"
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)'
        }}
      >
        <div className="container-custom">
          <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="text-white font-bold mb-6"
              style={{ fontSize: '2rem' }}
            >
              Garantie Qualité
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.8',
                marginBottom: '32px'
              }}
            >
              Nous croyons fermement que la qualité du produit est la pierre angulaire du développement
              à long terme. AFRICAMIONS a mis en place un centre de production et de rénovation complet
              avec des processus stricts : nettoyage, inspection du châssis, rénovation du moteur et
              de la transmission, assemblage de la cabine, vérification des circuits, et remplacement
              des flexibles et pneus.
            </p>
            <Link
              href="/catalogue"
              className="btn-primary inline-flex items-center"
            >
              Découvrir nos véhicules
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="r-section" style={{ padding: '100px 0' }}>
        <div className="container-custom">
          <div
            className="text-center bg-gray-50 px-6 py-10 sm:px-12 sm:py-16"
            style={{
              borderRadius: '16px',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <h2
              className="font-bold text-[#111827] mb-4"
              style={{ fontSize: '2rem' }}
            >
              Prêt à travailler avec nous ?
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: '#6B7280',
                lineHeight: '1.7',
                marginBottom: '32px',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}
            >
              Contactez-nous dès maintenant pour discuter de vos besoins en véhicules industriels.
            </p>
            <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '16px' }}>
              <Link
                href="/devis"
                className="btn-primary w-full sm:w-auto"
              >
                Demander un devis
              </Link>
              <Link
                href="/contact"
                className="btn-secondary w-full sm:w-auto"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
