const WHATSAPP_NUMBER = "8618716342426";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: `Bonjour Africamions,

Je visite votre site et je souhaite obtenir plus d'informations sur vos véhicules.

Merci de me recontacter.`,

  product: (productName: string) => `Bonjour Africamions,

Je suis intéressé par le modèle : ${productName}

Pouvez-vous me donner plus de détails (prix, disponibilité, options) ?

Merci.`,

  cta: `Bonjour Africamions,

Je souhaite recevoir un devis pour un ou plusieurs véhicules.

Merci de me recontacter pour discuter de mes besoins.`,

  contact: `Bonjour Africamions,

Je vous contacte via votre site web.

Merci de me rappeler dès que possible.`,

  footer: `Bonjour Africamions,

Je souhaite obtenir des informations sur vos services et véhicules disponibles.

Merci.`,
};
