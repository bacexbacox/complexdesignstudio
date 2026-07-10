## 3. Struktur Folder Proyek

```text
src/
├── lib/
│   ├── components/
│   │   ├── ui/                         # Atom: Button, Badge, Tag, Icon — murni reusable, tanpa logic bisnis
│   │   ├── layout/                     # Navbar, Footer, MobileMenu — struktur global
│   │   ├── shared/                     # Komponen yang dipakai >1 halaman
│   │   │   └── SeoHead.svelte          # Reusable SEO head component (dipakai semua halaman)
│   │   └── sections/
│   │       ├── home/                   # Komponen eksklusif halaman Home
│   │       │   ├── HeroSection.svelte
│   │       │   ├── StatsSection.svelte
│   │       │   └── ProjectCard.svelte
│   │       ├── service/                # Komponen eksklusif halaman Service
│   │       │   ├── ServiceCard.svelte
│   │       │   └── ServiceGrid.svelte
│   │       ├── portfolio/              # Komponen eksklusif halaman Portfolio
│   │       │   ├── PortfolioGrid.svelte
│   │       │   └── FilterBar.svelte
│   │       └── contact/               # Komponen eksklusif halaman Contact
│   │           └── ContactForm.svelte
│   ├── data/
│   │   ├── services.ts                 # Data semua layanan agency
│   │   └── portfolio.ts                # Data semua project portfolio
│   ├── types/
│   │   └── index.ts                    # Semua interface & type global
│   └── utils/
│       ├── slug.ts                     # Utility: slugify(), findBySlug()
│       └── seo.ts                      # Utility: buildMeta(), buildJsonLd()
└── routes/
    ├── +layout.svelte                  # Root layout (Header + Footer)
    ├── +layout.ts
    ├── +page.svelte                    # /  (Home)
    ├── service/
    │   └── +page.svelte               # /service
    ├── portfolio/
    │   ├── +page.svelte               # /portfolio
    │   └── [category]/
    │       ├── +page.svelte           # /portfolio/[category]  → contoh: /portfolio/website-development
    │       ├── +page.ts
    │       └── [slug]/
    │           ├── +page.svelte       # /portfolio/[category]/[slug]  → contoh: /portfolio/website-development/name-project
    │           └── +page.ts
    ├── contact/
    │   └── +page.svelte               # /contact
    ├── sitemap.xml/
    │   └── +server.ts                 # Dynamic sitemap generator
    └── robots.txt/
        └── +server.ts                 # Robots.txt generator
```

### Aturan Penempatan Komponen

Agent wajib mengikuti aturan ini sebelum membuat atau memindahkan komponen:

| Kondisi | Taruh di |
|---|---|
| Dipakai **1 halaman saja** | `sections/[nama-halaman]/` |
| Dipakai **2+ halaman** | `shared/` |
| Murni UI, tanpa logic bisnis | `ui/` |
| Struktur global (selalu tampil) | `layout/` |

**Jangan antisipasi duluan.** Buat komponen di `sections/[page]/` terlebih dahulu. Pindahkan ke `shared/` hanya ketika komponen tersebut benar-benar dibutuhkan di halaman lain — bukan sebelumnya.

### Aturan Pembuatan Halaman (Routes)

Untuk menjaga *maintainability*, semua halaman baru wajib mengikuti aturan struktural berikut:
1. **File Route sebagai Perakit (Assembler):** File `+page.svelte` di dalam folder `src/routes/` **HANYA** boleh berfungsi untuk merakit komponen. DILARANG KERAS menulis ratusan baris kode *markup* (HTML/Tailwind) murni di dalam `+page.svelte`.
2. **Ekstraksi Komponen Section:** Setiap bagian visual dari suatu halaman (contoh: Hero, Fitur, Testimoni) wajib dibuat sebagai komponen terpisah di dalam `src/lib/components/sections/[nama-halaman]/`.
3. **Kebersihan Kode:** File `+page.svelte` hanya boleh berisi import komponen section, `<SeoHead>`, dan pemanggilan tag komponen secara berurutan yang disuplai dengan data/props dari `+page.ts` / `+page.server.ts`.

### Catatan Slug

Parameter `[category]` adalah slug dari kategori utama service (bukan sub-service). Parameter `[slug]` adalah slug dari nama project/client. Keduanya dibaca dari `params` di `+page.ts`.

**Penting:** Gunakan nama generik pada contoh kode agar agent tidak terpaku pada satu nilai spesifik:

```ts
// src/routes/portfolio/[category]/[slug]/+page.ts
export const load = ({ params }) => {
  // params.category = "type-project"   → contoh: mobile-application
  // params.slug     = "name-project"   → contoh: nama-client-atau-project
};
```

**Mapping category slug dari data services:**
| Category Slug | Label di UI |
|---|---|
| `website-development` | Website Development |
| `mobile-application` | Mobile Application |
| `digital-marketing` | Digital Marketing |
| `ux-design` | User Experience Design |
| `creative-design` | Creative Design |
| `branding-product` | Branding Product |

Slug category di atas adalah nilai tetap yang mengacu ke `services.ts`. Jangan mengarang slug baru di luar daftar ini tanpa menambahkannya ke data services terlebih dahulu.

---