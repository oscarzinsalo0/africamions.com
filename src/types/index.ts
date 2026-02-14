export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: 'HOWO' | 'SHACMAN';
  category: 'benne' | 'tracteur' | 'malaxeur' | 'arroseuse' | 'fourgon' | 'plateau' | 'citerne';
  type: 'neuf' | 'renove';
  driveType: string;
  cabin: string;
  power: string;
  engine: string;
  transmission: string;
  emissionStandard: string;
  tires: string;
  cargoSize?: string;
  dimensions: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
  gallery?: string[];
}

export interface QuoteRequest {
  fullName: string;
  company: string;
  country: string;
  phone: string;
  email: string;
  model: string;
  quantity: number;
  message: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
