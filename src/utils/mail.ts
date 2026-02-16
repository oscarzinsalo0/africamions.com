import nodemailer from 'nodemailer';

// Shared Brevo SMTP transporter
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_API_KEY,
    },
  });
}

// Sender formatted as "Name <email>"
export function getSender() {
  const name = process.env.BREVO_SENDER_NAME || 'Africamions';
  const email = process.env.BREVO_SENDER_EMAIL || 'contact@africamions.com';
  return `${name} <${email}>`;
}

// Sanitize user input to prevent XSS in HTML emails
export function sanitize(input: string | number | undefined | null): string {
  if (input === undefined || input === null) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// In-memory rate limiter: max submissions per IP per window
const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= MAX_REQUESTS) {
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}

// Cleanup old entries periodically (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) {
      rateMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);
