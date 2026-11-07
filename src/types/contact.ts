export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  category: string;
  deliverables: string[];
  timeline: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  metrics: string;
  client: string;
  tags: string[];
  externalUrl?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarText: string;
  highlight: string;
}

export interface ProfileData {
  fullName: string;
  professionalTitle: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  timeZone: string;
  avatarUrl: string;
  statusText: string;
  statusAvailability: 'available' | 'busy' | 'consulting';
  resumeFilename: string;
  links: {
    portfolio: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
    telegram: string;
    calendly: string;
    twitter?: string;
    github?: string;
  };
  experience: string[];
  education: string[];
  services: ServiceOffering[];
  projects: PortfolioProject[];
  testimonials: Testimonial[];
}
