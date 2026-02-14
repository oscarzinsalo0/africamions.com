import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { products, getProductBySlug } from '@/data/products';
import { getWhatsAppLink, whatsappMessages } from '@/utils/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const specs = [
    { label: 'Marque', value: product.brand },
    { label: 'Type de conduite', value: product.driveType },
    { label: 'Cabine', value: product.cabin },
    { label: 'Puissance', value: product.power },
    { label: 'Moteur', value: product.engine },
    { label: 'Transmission', value: product.transmission },
    { label: 'Normes d\'émission', value: product.emissionStandard },
    { label: 'Pneumatiques', value: product.tires },
    ...(product.cargoSize ? [{ label: 'Taille cargo', value: product.cargoSize }] : []),
    { label: 'Dimensions', value: product.dimensions },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="bg-gray-50 border-b border-gray-200"
        style={{ paddingTop: '88px' }}
      >
        <div className="container-custom" style={{ padding: '16px 24px' }}>
          <nav className="flex items-center" style={{ gap: '8px', fontSize: '0.875rem' }}>
            <Link href="/" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              Accueil
            </Link>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <Link href="/catalogue" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              Catalogue
            </Link>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <span className="font-medium text-[#111827]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 sm:py-12 lg:py-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2" style={{ gap: '48px' }}>
            {/* Image Gallery */}
            <div>
              <div
                className="relative overflow-hidden bg-gray-100"
                style={{
                  aspectRatio: '4/3',
                  borderRadius: '12px'
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges on image - Marque + Neuf + Rénové */}
                <div
                  className="absolute flex flex-wrap"
                  style={{ top: '16px', left: '16px', gap: '8px' }}
                >
                  <span
                    className="text-xs font-semibold text-[#111827] bg-white"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {product.brand}
                  </span>
                  <span
                    className="text-xs font-semibold text-white"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#10B981'
                    }}
                  >
                    Neuf
                  </span>
                  <span
                    className="text-xs font-semibold text-white"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#0177ED'
                    }}
                  >
                    Rénové
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Category & Drive Type */}
              <p
                className="uppercase text-[#0177ED]"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  marginBottom: '12px'
                }}
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} • {product.driveType}
              </p>

              {/* Product Name */}
              <h1
                className="text-[#0A0A0A]"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  marginBottom: '16px'
                }}
              >
                {product.name}
              </h1>

              {/* Disponibilité Neuf / Rénové */}
              <div
                className="flex items-center"
                style={{
                  gap: '10px',
                  marginBottom: '24px'
                }}
              >
                <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                  Disponible en :
                </span>
                <span
                  className="text-xs font-semibold text-white"
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#10B981'
                  }}
                >
                  Neuf
                </span>
                <span
                  className="text-xs font-semibold text-white"
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#0177ED'
                  }}
                >
                  Rénové
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#4B5563',
                  lineHeight: '1.8',
                  marginBottom: '32px'
                }}
              >
                {product.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col" style={{ gap: '12px', marginBottom: '40px' }}>
                <Link
                  href={`/devis?model=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center justify-center text-white font-semibold bg-[#0177ED] hover:bg-[#0165CC] transition-colors"
                  style={{
                    padding: '18px 32px',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    width: '100%'
                  }}
                >
                  Demander un devis
                </Link>
                <a
                  href={getWhatsAppLink(whatsappMessages.product(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[#111827] font-semibold border transition-colors hover:bg-gray-50"
                  style={{
                    padding: '18px 32px',
                    borderRadius: '12px',
                    borderColor: '#E5E7EB',
                    fontSize: '1.1rem',
                    gap: '10px'
                  }}
                >
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contacter sur WhatsApp
                </a>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '32px' }}>
                <h2
                  className="font-semibold text-[#111827] mb-4"
                  style={{ fontSize: '1.25rem' }}
                >
                  Caractéristiques
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.features.map((feature, index) => (
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
                      <span style={{ color: '#374151', lineHeight: '1.6' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h2
                  className="font-semibold text-[#111827] mb-4"
                  style={{ fontSize: '1.25rem' }}
                >
                  Domaines d&apos;application
                </h2>
                <div className="flex flex-wrap" style={{ gap: '8px' }}>
                  {product.applications.map((app, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        borderRadius: '20px',
                        fontSize: '0.875rem'
                      }}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="r-specs-title" style={{ marginTop: '80px' }}>
            <h2
              className="font-bold text-[#111827]"
              style={{ fontSize: '1.5rem', marginBottom: '32px' }}
            >
              Paramètres techniques
            </h2>
            <div
              className="overflow-x-auto -mx-4 sm:mx-0"
              style={{
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}
            >
              <table className="w-full min-w-[400px]">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFFFFF'
                      }}
                    >
                      <td
                        className="text-xs sm:text-sm"
                        style={{
                          padding: '12px 16px',
                          fontWeight: '600',
                          color: '#111827',
                          width: '35%',
                          borderBottom: index < specs.length - 1 ? '1px solid #E5E7EB' : 'none'
                        }}
                      >
                        {spec.label}
                      </td>
                      <td
                        className="text-xs sm:text-sm"
                        style={{
                          padding: '12px 16px',
                          color: '#374151',
                          borderBottom: index < specs.length - 1 ? '1px solid #E5E7EB' : 'none'
                        }}
                      >
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back to Catalogue */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link
              href="/catalogue"
              className="inline-flex items-center text-[#0177ED] font-semibold hover:underline"
              style={{ gap: '10px' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Retour au catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
