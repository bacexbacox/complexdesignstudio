## 5. SEO & Accessibility (a11y) — Wajib dari Hari Pertama

SEO dan Aksesibilitas bukan fitur tambahan. Setiap halaman yang dibuat wajib sudah memenuhi standar ini sebelum dianggap selesai.

### Check List Aksesibilitas (a11y)
- **Aria Labels:** Semua elemen interaktif (tombol, link icon) yang tidak memiliki teks wajib menggunakan atribut `aria-label` yang deskriptif.
- **Semantic HTML:** Gunakan tag HTML5 yang tepat (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`). Hindari penggunaan `<div>` jika ada tag yang lebih relevan.
- **Form Labels:** Setiap elemen form wajib memiliki `<label>` yang terhubung dengan `id` input yang relevan.
- **Jangan abaikan warning:** Svelte memiliki *a11y warnings* bawaan compiler. **JANGAN PERNAH men-disable warning a11y**. Selesaikan peringatan tersebut.

### Struktur Meta per Halaman

Setiap route wajib punya file `meta.ts` atau data meta di `+page.ts`/`+page.server.ts`:

```ts
// Contoh: src/routes/+page.ts (Home)
import type { SeoMeta } from '$lib/types';

export const load = () => {
  const meta: SeoMeta = {
    title: 'Complex Design Studio — Web & App Development Agency',
    description: 'Kami membangun web dan aplikasi yang berdampak. Web development, mobile apps, UI/UX design, dan digital marketing untuk bisnis Anda.',
    canonical: 'https://complexdesignstudio.com/',
    ogImage: '/og/home.jpg',
    noIndex: false,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Complex Design Studio',
      url: 'https://complexdesignstudio.com',
      description: '...'
    }
  };
  return { meta };
};
```

### `SeoHead` Component (`src/lib/components/shared/SeoHead.svelte`)

Jangan tulis `<svelte:head>` berulang di setiap halaman. Gunakan satu komponen reusable:

```svelte
<!-- src/lib/components/shared/SeoHead.svelte -->
<script lang="ts">
  import type { SeoMeta } from '$lib/types';
  let { meta }: { meta: SeoMeta } = $props();
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />

  <!-- Open Graph -->
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.ogImage ?? '/og/default.jpg'} />
  <meta property="og:url" content={meta.canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Complex Design Studio" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.ogImage ?? '/og/default.jpg'} />

  {#if meta.noIndex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  {#if meta.jsonLd}
    {@html `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}<\/script>`}
  {/if}
</svelte:head>
```

Penggunaan di setiap halaman cukup satu baris:

```svelte
<script lang="ts">
  import SeoHead from '$lib/components/shared/SeoHead.svelte';
  let { data } = $props();
</script>

<SeoHead meta={data.meta} />
```

### Sitemap Dinamis (`src/routes/sitemap.xml/+server.ts`)

```ts
import { projects } from '$lib/data/portfolio';

export const GET = () => {
  const baseUrl = 'https://complexdesignstudio.com';
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const staticRoutes = [
    { path: '/',           priority: '1.0', changefreq: 'weekly'  },
    { path: '/service',    priority: '0.9', changefreq: 'monthly' },
    { path: '/portfolio',  priority: '0.9', changefreq: 'weekly'  },
    { path: '/contact',    priority: '0.7', changefreq: 'yearly'  },
  ];

  const portfolioRoutes = projects.map(p => ({
    path: `/portfolio/${p.categorySlug}/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allRoutes = [...staticRoutes, ...portfolioRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
```

### Robots.txt (`src/routes/robots.txt/+server.ts`)

```ts
export const GET = () => {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://complexdesignstudio.com/sitemap.xml`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' }
  });
};
```

### Checklist SEO per Halaman

Sebelum dianggap selesai, setiap halaman wajib memenuhi:

- [ ] `<SeoHead meta={data.meta} />` terpasang di atas markup halaman
- [ ] `title` unik, maksimal 60 karakter
- [ ] `description` unik, 120–160 karakter
- [ ] `canonical` terset dengan URL absolut
- [ ] `og:title`, `og:description`, `og:image`, `og:url` lengkap
- [ ] `twitter:card`, `twitter:title`, `twitter:image` lengkap
- [ ] Satu `<h1>` per halaman
- [ ] Semua `<img>` punya `alt` yang deskriptif
- [ ] Semua `<img>` punya `width` dan `height` (mencegah CLS)
- [ ] JSON-LD structured data (portfolio: `CreativeWork`, home: `Organization`, contact: `LocalBusiness`)
- [ ] Sitemap otomatis terupdate karena mengambil dari data layer

---