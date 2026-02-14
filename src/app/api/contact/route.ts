import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for Africamions
    const adminEmailContent = `
      <h2>Nouveau message de contact - Africamions</h2>

      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nom</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Téléphone</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone || 'Non renseigné'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Sujet</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; color: #666;">
        Date de réception : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
      </p>
    `;

    // Email de confirmation pour le client
    const clientEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0177ED; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">AFRICAMIONS</h1>
        </div>

        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Bonjour ${name},</h2>

          <p style="color: #666; line-height: 1.6;">
            Nous avons bien reçu votre message et nous vous en remercions.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Notre équipe vous répondra dans les plus brefs délais.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Pour toute urgence, vous pouvez nous contacter directement sur WhatsApp :
            <br>
            <a href="https://wa.me/8618716342426" style="color: #0177ED; font-weight: bold;">
              +86 187 1634 2426
            </a>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="color: #999; font-size: 14px;">
            Cordialement,<br>
            <strong>L'équipe Africamions</strong><br>
            Opéré par Chongqing Chuanyu Ji International Trade Co., Ltd. (Chine)
          </p>
        </div>

        <div style="background-color: #333; padding: 20px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            www.africamions.com | contact@africamions.com | +86 187 1634 2426
          </p>
        </div>
      </div>
    `;

    // Send email to Africamions
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@africamions.com',
      to: 'contact@africamions.com',
      subject: `[Contact] ${subject} - ${name}`,
      html: adminEmailContent,
      replyTo: email,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@africamions.com',
      to: email,
      subject: 'Confirmation de réception de votre message – Africamions',
      html: clientEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
