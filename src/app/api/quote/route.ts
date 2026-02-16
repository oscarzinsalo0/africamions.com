import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createTransporter, getSender, sanitize, checkRateLimit } from '@/utils/mail';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
      || headersList.get('x-real-ip')
      || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer dans une heure.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, company, country, phone, email, model, version, quantity, message } = body;

    // Validate required fields
    if (!fullName || !company || !country || !phone || !email || !model || !quantity) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const s = {
      fullName: sanitize(fullName),
      company: sanitize(company),
      country: sanitize(country),
      phone: sanitize(phone),
      email: sanitize(email),
      model: sanitize(model),
      version: sanitize(version),
      quantity: sanitize(quantity),
      message: sanitize(message),
    };

    const versionLabels: Record<string, string> = {
      neuf: 'Neuf',
      renove: 'Rénové',
      les_deux: 'Neuf et Rénové',
    };
    const versionLabel = versionLabels[version] || s.version || '—';

    const transporter = createTransporter();
    const from = getSender();
    const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // ─── Email notification admin ───
    const adminHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <style>
    body { margin: 0; padding: 0; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; max-width: 100% !important; }
      .content { padding: 20px !important; }
      .header { padding: 20px !important; }
      .two-col { display: block !important; width: 100% !important; }
      .label-col { width: 100% !important; display: block !important; padding: 8px 12px !important; font-weight: 600 !important; }
      .value-col { width: 100% !important; display: block !important; padding: 8px 12px 16px 12px !important; }
      .cta-btn { padding: 14px 20px !important; font-size: 15px !important; width: auto !important; display: inline-block !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <center>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;padding:20px 0;">
    <tr><td align="center">
      <!-- Badge de notification -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;">
        <tr><td align="center">
          <div style="display:inline-block;background-color:#10B981;color:#ffffff;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;letter-spacing:0.5px;">
            🎉 NOUVELLE DEMANDE DE DEVIS
          </div>
        </td></tr>
      </table>

      <!-- Container principal -->
      <table class="wrapper" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:600px;margin:0 auto;">

        <!-- Header -->
        <tr>
          <td class="header" style="background:linear-gradient(135deg, #0177ED 0%, #0165CC 100%);padding:28px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:0.5px;">AFRICAMIONS</td>
              </tr>
              <tr>
                <td style="color:rgba(255,255,255,0.9);font-size:14px;padding-top:8px;">Demande de devis reçue</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="content" style="padding:32px 30px;">

            <!-- Section Client -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-bottom:12px;">
                  <h2 style="margin:0;color:#111827;font-size:18px;font-weight:700;display:flex;align-items:center;">
                    👤 Informations du client
                  </h2>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <tr style="background-color:#f9fafb;">
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:180px;font-weight:500;">Nom complet</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;font-weight:600;">${s.fullName}</td>
              </tr>
              <tr>
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Société</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;font-weight:600;">${s.company}</td>
              </tr>
              <tr style="background-color:#f9fafb;">
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Pays</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;">🌍 ${s.country}</td>
              </tr>
              <tr>
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Téléphone / WhatsApp</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;">
                  <a href="https://wa.me/${s.phone.replace(/[^0-9+]/g, '')}" style="color:#25D366;text-decoration:none;font-weight:600;">📱 ${s.phone}</a>
                </td>
              </tr>
              <tr style="background-color:#f9fafb;">
                <td class="label-col two-col" style="padding:12px 16px;color:#6b7280;font-size:13px;font-weight:500;">Email</td>
                <td class="value-col two-col" style="padding:12px 16px;color:#111827;font-size:15px;">
                  <a href="mailto:${s.email}" style="color:#0177ED;text-decoration:none;">✉️ ${s.email}</a>
                </td>
              </tr>
            </table>

            <!-- Section Demande -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
              <tr>
                <td style="padding-bottom:12px;">
                  <h2 style="margin:0;color:#111827;font-size:18px;font-weight:700;">
                    🚛 Détails de la demande
                  </h2>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <tr style="background-color:#f0f7ff;border-left:4px solid #0177ED;">
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:180px;font-weight:500;">Modèle demandé</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#0177ED;font-size:15px;font-weight:700;">${s.model}</td>
              </tr>
              <tr>
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Version</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;">
                  <span style="display:inline-block;background-color:#ecfdf5;color:#059669;padding:4px 12px;border-radius:12px;font-size:13px;font-weight:600;">${versionLabel}</span>
                </td>
              </tr>
              <tr style="background-color:#f9fafb;">
                <td class="label-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Quantité</td>
                <td class="value-col two-col" style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:15px;font-weight:600;">${s.quantity} unité${parseInt(s.quantity) > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td class="label-col two-col" style="padding:12px 16px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Message</td>
                <td class="value-col two-col" style="padding:12px 16px;color:#111827;font-size:14px;line-height:1.6;">${s.message || '<span style="color:#9ca3af;font-style:italic;">Aucun message</span>'}</td>
              </tr>
            </table>

            <!-- CTA WhatsApp -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
              <tr>
                <td align="center" style="padding:20px;background-color:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
                  <p style="margin:0 0 12px;color:#166534;font-size:14px;font-weight:600;">Répondre rapidement au client :</p>
                  <a href="https://wa.me/${s.phone.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Bonjour ${s.fullName}, merci pour votre demande de devis concernant ${s.model}. Nous préparons votre offre commerciale.`)}"
                     class="cta-btn"
                     style="display:inline-block;background-color:#25D366;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:16px;font-weight:600;box-shadow:0 2px 8px rgba(37,211,102,0.3);">
                    💬 Répondre sur WhatsApp
                  </a>
                </td>
              </tr>
            </table>

            <!-- Footer info -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-top:20px;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
                    📅 Reçu le ${date}<br>
                    🌐 IP : ${sanitize(ip)}
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </td></tr>
  </table>
  </center>
</body>
</html>`;

    // ─── Email de confirmation client ───
    const clientHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background-color:#0177ED;padding:28px 30px;text-align:center;">
            <span style="color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:1px;">AFRICAMIONS</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 30px 20px;">
            <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Bonjour ${s.fullName},</h2>
            <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">
              Nous avons bien reçu votre demande de devis et nous vous en remercions. Notre équipe commerciale l'examine et vous contactera dans les plus brefs délais avec une offre personnalisée.
            </p>

            <!-- Recap box -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;overflow:hidden;margin:0 0 24px;">
              <tr>
                <td style="padding:16px 20px 8px;">
                  <p style="margin:0;color:#0177ED;font-size:14px;font-weight:600;">Récapitulatif de votre demande</p>
                </td>
              </tr>
              <tr>
                <td style="padding:4px 20px 16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Société :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${s.company}</td>
                    </tr>
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Pays :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${s.country}</td>
                    </tr>
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Modèle :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${s.model}</td>
                    </tr>
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Version :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${versionLabel}</td>
                    </tr>
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Quantité :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${s.quantity}</td>
                    </tr>
                    ${s.message ? `
                    <tr>
                      <td width="90" style="padding:4px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">Message :&nbsp;</td>
                      <td style="padding:4px 0;color:#111827;font-size:14px;">${s.message}</td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>

            <!-- WhatsApp CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
              <tr>
                <td style="background-color:#f9fafb;border-radius:8px;padding:16px 20px;text-align:center;">
                  <p style="margin:0 0 8px;color:#4b5563;font-size:14px;">Pour toute urgence, contactez-nous sur WhatsApp :</p>
                  <a href="https://wa.me/8618716342426" style="display:inline-block;background-color:#25D366;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:6px;font-size:14px;font-weight:600;">+86 187 1634 2426</a>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
              Cordialement,<br>
              <strong style="color:#111827;">L'équipe Africamions</strong><br>
              <span style="color:#9ca3af;font-size:13px;">Chongqing Chuanyu Ji International Trade Co., Ltd.</span>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#1f2937;padding:20px 30px;text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:0 0 18px;font-size:12px;line-height:1.8;">
                  <a href="https://africamions.com" style="color:#60a5fa;text-decoration:none;white-space:nowrap;">www.africamions.com</a>
                  <span style="color:rgba(255,255,255,0.3);padding:0 10px;">|</span>
                  <span style="color:rgba(255,255,255,0.7);white-space:nowrap;">contact@africamions.com</span>
                  <span style="color:rgba(255,255,255,0.3);padding:0 10px;">|</span>
                  <span style="color:rgba(255,255,255,0.7);white-space:nowrap;">+86 187 1634 2426</span>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:10px;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.5;">&copy; 2026 Africamions. Tous droits réservés.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // Send notification to admin
    await transporter.sendMail({
      from,
      to: 'contact@africamions.com',
      subject: `🎉 Nouveau devis - ${s.model} • ${s.company} (${s.country})`,
      html: adminHtml,
    });

    // Send confirmation to client
    await transporter.sendMail({
      from,
      to: email,
      replyTo: 'contact@africamions.com',
      subject: 'Votre demande de devis a bien été reçue – Africamions',
      html: clientHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande" },
      { status: 500 }
    );
  }
}
