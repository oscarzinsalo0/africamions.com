import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, company, country, phone, email, model, quantity, message } = body;

    // Validate required fields
    if (!fullName || !company || !country || !phone || !email || !model || !quantity) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    // Note: In production, use environment variables for credentials
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
      <h2>Nouvelle demande de devis - Africamions</h2>

      <h3>Informations du client</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nom complet</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Société</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pays</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${country}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Téléphone / WhatsApp</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
      </table>

      <h3>Demande</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Modèle demandé</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${model}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantité</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${quantity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message || 'Aucun message'}</td>
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
          <h2 style="color: #333;">Bonjour ${fullName},</h2>

          <p style="color: #666; line-height: 1.6;">
            Nous avons bien reçu votre demande de devis concernant nos camions et véhicules industriels.
          </p>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Récapitulatif de votre demande :</h3>
            <p><strong>Modèle :</strong> ${model}</p>
            <p><strong>Quantité :</strong> ${quantity}</p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            Notre équipe commerciale vous contactera dans les plus brefs délais avec une offre
            personnalisée adaptée à vos besoins.
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
      subject: `[Nouveau devis] ${model} - ${company} (${country})`,
      html: adminEmailContent,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@africamions.com',
      to: email,
      subject: 'Confirmation de réception de votre demande de devis – Africamions',
      html: clientEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la demande' },
      { status: 500 }
    );
  }
}
