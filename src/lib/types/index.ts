export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  client: string;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
  year: number;
  url?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}
