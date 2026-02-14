import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { getWhatsAppLink, whatsappMessages } from '@/utils/whatsapp';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Africamions pour toute demande d\'information sur nos camions et véhicules industriels. WhatsApp: +86 187 1634 2426, Email: contact@africamions.com',
};

export default function ContactPage() {
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
              Contactez-nous
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: '1.7' }}>
              Une question ? Un projet ? Notre équipe est à votre disposition pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - 2 Columns */}
      <section className="r-section-sm" style={{ padding: '80px 0 100px' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2
                className="font-bold text-[#111827] mb-8"
                style={{ fontSize: '1.5rem' }}
              >
                Nos coordonnées
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* WhatsApp Card */}
                <div
                  className="bg-white"
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#DCFCE7',
                        borderRadius: '12px'
                      }}
                    >
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div style={{ marginLeft: '16px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>WhatsApp</p>
                      <a
                        href={getWhatsAppLink(whatsappMessages.contact)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#111827] hover:text-[#0177ED] transition-colors"
                        style={{ fontSize: '1.125rem' }}
                      >
                        +86 187 1634 2426
                      </a>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Disponible 24h/24</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div
                  className="bg-white"
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#EBF5FF',
                        borderRadius: '12px'
                      }}
                    >
                      <svg className="w-6 h-6 text-[#0177ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div style={{ marginLeft: '16px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>Email</p>
                      <a
                        href="mailto:contact@africamions.com"
                        className="font-semibold text-[#111827] hover:text-[#0177ED] transition-colors"
                        style={{ fontSize: '1.125rem' }}
                      >
                        contact@africamions.com
                      </a>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Réponse sous 24h</p>
                    </div>
                  </div>
                </div>

                {/* Website Card */}
                <div
                  className="bg-white"
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '12px'
                      }}
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div style={{ marginLeft: '16px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>Site web</p>
                      <span className="font-semibold text-[#111827]" style={{ fontSize: '1.125rem' }}>
                        www.africamions.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div
                  style={{
                    paddingTop: '24px',
                    marginTop: '12px',
                    borderTop: '1px solid #E5E7EB'
                  }}
                >
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '8px' }}>Société opératrice</p>
                  <p className="font-semibold text-[#111827]">
                    Chongqing Chuanyu Ji International Trade Co., Ltd.
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '4px' }}>Chine</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className="bg-gray-50"
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  marginTop: '24px'
                }}
              >
                <h3
                  className="font-semibold text-[#111827]"
                  style={{ fontSize: '1rem', marginBottom: '20px' }}
                >
                  Actions rapides
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a
                    href={getWhatsAppLink(whatsappMessages.contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
                    style={{
                      padding: '14px 20px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      gap: '10px'
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Ouvrir WhatsApp
                  </a>
                  <a
                    href="mailto:contact@africamions.com"
                    className="flex items-center justify-center w-full font-semibold text-[#111827] bg-white border hover:bg-gray-50 transition-colors"
                    style={{
                      padding: '14px 20px',
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '0.875rem',
                      gap: '10px'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Envoyer un email
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div
                className="bg-white"
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <h2
                  className="font-bold text-[#111827] mb-6"
                  style={{ fontSize: '1.5rem' }}
                >
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
