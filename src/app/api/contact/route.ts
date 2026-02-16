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
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const s = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      subject: sanitize(subject),
      message: sanitize(message),
    };

    const transporter = createTransporter();
    const from = getSender();
    const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // ─── Email notification admin ───
    const adminHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background-color:#0177ED;padding:24px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:1px;">AFRICAMIONS</td>
                <td align="right" style="color:rgba(255,255,255,0.85);font-size:13px;">Nouveau message de contact</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
              <tr style="background-color:#f9fafb;">
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:140px;">Nom</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:500;">${s.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Email</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${s.email}</td>
              </tr>
              <tr style="background-color:#f9fafb;">
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Téléphone</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${s.phone || '<span style="color:#9ca3af;">Non renseigné</span>'}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Sujet</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:500;">${s.subject}</td>
              </tr>
              <tr style="background-color:#f9fafb;">
                <td style="padding:10px 14px;color:#6b7280;font-size:13px;vertical-align:top;">Message</td>
                <td style="padding:10px 14px;color:#111827;font-size:14px;line-height:1.5;">${s.message}</td>
              </tr>
            </table>

            <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">Reçu le ${date} &bull; IP : ${sanitize(ip)}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // ─── Email de confirmation client ───
    const clientHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:30px 0;">
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
            <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Bonjour ${s.name},</h2>
            <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">
              Nous avons bien reçu votre message et nous vous en remercions. Notre équipe vous répondra dans les plus brefs délais.
            </p>

            <!-- Recap box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;overflow:hidden;margin:0 0 24px;">
              <tr>
                <td style="padding:16px 20px 8px;">
                  <p style="margin:0;color:#0177ED;font-size:14px;font-weight:600;">Votre message</p>
                </td>
              </tr>
              <tr>
                <td style="padding:4px 20px 16px;">
                  <p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Sujet : <strong style="color:#111827;">${s.subject}</strong></p>
                  <p style="margin:0;color:#374151;font-size:14px;line-height:1.5;">${s.message}</p>
                </td>
              </tr>
            </table>

            <!-- WhatsApp CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
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
      subject: `[Contact] ${s.subject} – ${s.name}`,
      html: adminHtml,
      replyTo: email,
    });

    // Send confirmation to client
    await transporter.sendMail({
      from,
      to: email,
      replyTo: 'contact@africamions.com',
      subject: 'Nous avons bien reçu votre message – Africamions',
      html: clientHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
