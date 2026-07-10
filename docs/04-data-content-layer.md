## 4. Data & Content Layer

Semua data statis disimpan di `src/lib/data/` dalam format TypeScript dengan typed interface. Jangan hardcode data langsung di file `.svelte`.

### Interface Wajib (`src/lib/types/index.ts`)

```ts
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
```

### Data Services (`src/lib/data/services.ts`)

Kategori utama portfolio diambil dari service utama. Slug ini adalah nilai tetap — gunakan persis seperti ini di seluruh codebase:
- `website-development` → Website Development
- `mobile-application` → Mobile Application
- `digital-marketing` → Digital Marketing
- `ux-design` → User Experience Design
- `creative-design` → Creative Design
- `branding-product` → Branding Product

```ts
import type { Service } from '$lib/types';

export const services: Service[] = [
  {
    id: '1',
    slug: 'website-development',        // ← slug tetap, jangan diubah
    title: 'Website Development',
    description: '...',
    icon: '...',
    items: ['Web Applications', 'Web Design & CMS', 'SaaS Platforms', 'API Integrations', 'Maintenance & Support', 'Scaling & Performance']
  },
  // ... dst sesuai daftar 6 kategori di atas
];
```

### Data Portfolio (`src/lib/data/portfolio.ts`)

```ts
import type { PortfolioProject } from '$lib/types';

export const projects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'name-project-client',             // ← kebab-case nama project/client
    categorySlug: 'website-development',     // ← wajib sesuai slug di services.ts
    title: 'Nama Project',
    client: 'Nama Client',
    description: '...',
    coverImage: '/images/portfolio/name-project/cover.webp',
    images: [],
    tags: ['SvelteKit', 'Tailwind'],
    year: 2024
  }
];

// Helper functions
export const getProjectsByCategory = (category: string) =>
  projects.filter(p => p.categorySlug === category);

export const getProjectBySlug = (category: string, slug: string) =>
  projects.find(p => p.categorySlug === category && p.slug === slug);
```

---