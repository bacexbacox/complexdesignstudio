# Rencana Implementasi Website Dwibahasa (EN/ID)

## Tujuan

Menambahkan Bahasa Indonesia ke `complexdesignstudio.com` tanpa mengubah URL English yang sudah ada. Bahasa Inggris tetap menjadi base locale tanpa prefix URL; Bahasa Indonesia menggunakan prefix `/id`.

Target SEO adalah agar Google dapat memilih versi Indonesia untuk pencarian dan pengguna berbahasa Indonesia, melalui konten Indonesia yang relevan serta implementasi `hreflang` yang benar. Ini bukan auto-redirect berdasarkan bahasa browser.

## Kontrak URL

| Halaman | English | Bahasa Indonesia |
| --- | --- | --- |
| Home | `/` | `/id` |
| Services | `/service` | `/id/service` |
| About | `/about` | `/id/about` |
| Contact | `/contact` | `/id/contact` |
| Kategori portfolio | `/portfolio/{category}` | `/id/portfolio/{category}` |
| Detail portfolio | `/portfolio/{category}/{slug}` | `/id/portfolio/{category}/{slug}` |
| Portfolio index sementara | `/portfolio` -> `/service` | `/id/portfolio` -> `/id/service` |
| Contact API | `/api/contact` | Tetap `/api/contact` |

Aturan:

- English adalah locale default dan tidak memiliki prefix.
- Indonesian menggunakan prefix `/id`.
- Slug halaman, kategori, dan proyek tetap sama pada kedua bahasa.
- Seluruh URL menggunakan `trailingSlash: 'never'`.
- Asset, `robots.txt`, `sitemap.xml`, dan API tidak diberi prefix locale.
- Route kategori dan detail portfolio tetap tersedia; hanya portfolio index yang diarahkan ke halaman services.

## Arsitektur routing

Jangan membuat route fisik `src/routes/id/...`. SvelteKit tetap memiliki satu route tree; Paraglide menangani locale dari URL dan me-reroute URL berprefix ke route canonical.

```text
/about       -> route internal /about, locale en
/id/about    -> route internal /about, locale id
```

Struktur yang direkomendasikan:

```text
complex-frontend/
├── messages/
│   ├── en.json
│   └── id.json
├── project.inlang/
│   └── settings.json
├── src/
│   ├── app.html
│   ├── hooks.ts
│   ├── hooks.server.ts
│   ├── lib/
│   │   ├── paraglide/                 # Generated; jangan diedit manual
│   │   ├── i18n/
│   │   │   ├── locale.ts
│   │   │   ├── navigation.ts
│   │   │   └── seo.ts
│   │   ├── data/
│   │   │   ├── services.ts
│   │   │   ├── services.en.ts
│   │   │   ├── services.id.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── portfolio.en.ts
│   │   │   └── portfolio.id.ts
│   │   └── components/
│   │       ├── layout/LanguageSwitcher.svelte
│   │       └── shared/SeoHead.svelte
│   └── routes/                        # Satu route tree saja
│       ├── +layout.svelte
│       ├── +page.svelte
│       ├── about/
│       ├── contact/
│       ├── service/
│       ├── portfolio/
│       │   ├── +page.ts               # Redirect locale-aware
│       │   └── [category]/[slug]/
│       ├── api/contact/
│       └── sitemap.xml/
└── vite.config.ts
```

## Konfigurasi Paraglide

1. Tambahkan Paraglide Vite plugin dengan locale `en` dan `id`.
2. Gunakan strategi URL dengan `en` sebagai base locale.
3. Kecualikan `/api`, `/sitemap.xml`, dan endpoint teknis dari locale routing.
4. Tambahkan middleware pada `hooks.server.ts` untuk menentukan locale request dan mengganti token HTML.
5. Tambahkan `reroute` hook pada `hooks.ts` agar `/id/...` memakai file route yang sama dengan EN.
6. Ubah `src/app.html` menjadi:

```html
<html lang="%lang%" dir="%dir%">
```

Hasil yang wajib:

```html
<!-- /service -->
<html lang="en">

<!-- /id/service -->
<html lang="id">
```

## Content layer

### Paraglide messages

Simpan teks UI yang pendek dan berulang di `messages/en.json` dan `messages/id.json`:

- Navbar dan mega menu
- Footer
- CTA dan tombol
- Heading section
- Label portfolio
- Label, placeholder, serta status form
- Pesan sukses/gagal
- Accessibility labels
- Metadata halaman statis

### Data TypeScript

Simpan konten panjang dan data berelasi di `src/lib/data`:

- 6 layanan
- 23 detail portfolio
- Judul, deskripsi, tag, dan service label per bahasa

Data shared tetap memuat key stabil, slug, client, tahun, serta asset. Konten EN dan ID dipisahkan agar terjemahan panjang mudah dikelola dan dapat divalidasi kelengkapannya.

```ts
interface PortfolioProjectCore {
	key: string;
	slug: string;
	categorySlug: string;
	client: string;
	year: number;
	coverImage: string;
	images: string[];
}

interface PortfolioProjectContent {
	title: string;
	description: string;
	tags: string[];
	serviceLabel?: string;
}
```

Jangan memindahkan seluruh deskripsi portfolio panjang ke message JSON UI.

## Navigasi dan language switcher

Semua internal link harus menggunakan helper URL terlokalisasi, bukan string `href` hardcoded.

```text
/about                                      <-> /id/about
/portfolio/ux-design                        <-> /id/portfolio/ux-design
/portfolio/ux-design/bsm-pawning            <-> /id/portfolio/ux-design/bsm-pawning
```

Language switcher harus tersedia pada navbar desktop dan mobile, memakai full document reload saat berganti locale agar URL, HTML SSR, metadata, dan runtime locale selalu sinkron.

External URL, asset, `mailto:`, WhatsApp, dan `/api/contact` tidak dilokalisasi.

## Redirect portfolio

Redirect yang telah dibuat untuk `/portfolio` harus menjadi locale-aware setelah Paraglide dipasang:

```text
/portfolio     -> /service
/id/portfolio  -> /id/service
```

Gunakan status `308 Permanent Redirect`. Jangan masukkan URL redirect ini ke sitemap.

## SEO: canonical dan hreflang

Setiap halaman EN dan ID memiliki canonical ke dirinya sendiri, serta set `hreflang` yang sama dan saling menunjuk.

Contoh untuk halaman services English (`/service`):

```html
<link rel="canonical" href="https://complexdesignstudio.com/service">

<link rel="alternate" hreflang="en"
  href="https://complexdesignstudio.com/service">
<link rel="alternate" hreflang="id"
  href="https://complexdesignstudio.com/id/service">
<link rel="alternate" hreflang="x-default"
  href="https://complexdesignstudio.com/service">
```

Contoh untuk halaman services Indonesia (`/id/service`):

```html
<link rel="canonical" href="https://complexdesignstudio.com/id/service">

<link rel="alternate" hreflang="en"
  href="https://complexdesignstudio.com/service">
<link rel="alternate" hreflang="id"
  href="https://complexdesignstudio.com/id/service">
<link rel="alternate" hreflang="x-default"
  href="https://complexdesignstudio.com/service">
```

Aturan SEO:

- Canonical EN tidak boleh menunjuk ke ID, dan sebaliknya.
- `hreflang` harus reciprocal pada kedua halaman.
- `x-default` menunjuk ke EN sebagai fallback URL tanpa prefix.
- `x-default` bukan sinyal untuk menaikkan ranking Indonesia.
- Title, description, Open Graph, Twitter card, dan JSON-LD harus sesuai locale.
- Tambahkan `inLanguage` pada JSON-LD yang relevan.
- Konten ID harus merupakan copy Indonesia yang natural dan kontekstual, bukan terjemahan literal.

`hreflang` membantu Google memilih versi ID bagi pengguna/pencarian berbahasa Indonesia, tetapi tidak melakukan redirect browser dan tidak menjamin hasil yang sama untuk setiap pengguna.

## Sitemap

Sitemap tunggal harus memuat seluruh URL yang dapat diindeks dalam kedua bahasa.

```text
/
/id
/service
/id/service
/about
/id/about
/contact
/id/contact
/portfolio/{category}
/id/portfolio/{category}
/portfolio/{category}/{slug}
/id/portfolio/{category}/{slug}
```

Jangan masukkan:

```text
/portfolio
/id/portfolio
/api/contact
```

Sitemap dapat menyertakan anotasi hreflang XML, tetapi head tags tetap harus benar pada setiap halaman.

## Contact form dan API

Endpoint tetap `POST /api/contact`.

API sebaiknya mengirim error code stabil, bukan pesan English yang sudah jadi:

```json
{ "success": false, "code": "VALIDATION_ERROR" }
```

Komponen form menerjemahkan code tersebut dengan Paraglide. Dengan demikian pesan form mengikuti bahasa halaman tanpa melokalisasi endpoint API.

## Tahapan implementasi

### Fase 1 — Fondasi i18n

1. Install dan konfigurasi Paraglide.
2. Tambahkan `messages/en.json` dan `messages/id.json`.
3. Tambahkan `hooks.ts` dan `hooks.server.ts`.
4. Ubah `app.html` untuk `lang` dan `dir` dinamis.
5. Pastikan `/id`, `/id/about`, dan `/id/service` dirender melalui route tree yang sama.

### Fase 2 — Navigasi global

1. Tambahkan language switcher.
2. Lokalisasi Navbar dan Footer.
3. Ganti semua internal link menjadi localized URL.
4. Pastikan `/id/portfolio` redirect ke `/id/service`.

### Fase 3 — Halaman utama

Migrasikan Home, Service, About, dan Contact:

1. UI text dan CTA.
2. Metadata locale-specific.
3. JSON-LD locale-specific.
4. Form labels, status, dan pesan error.

### Fase 4 — Services dan kategori portfolio

1. Pisahkan konten EN/ID untuk enam services.
2. Lokalisasi judul dan deskripsi kategori.
3. Buat metadata kategori per locale.

### Fase 5 — Detail portfolio

Migrasikan semua 23 proyek:

1. Title.
2. Description.
3. Tags dan service label.
4. SEO title dan meta description.
5. JSON-LD description.

Asset, client, tahun, slug, dan gallery tetap shared.

### Fase 6 — SEO teknis

1. Perluas `SeoHead.svelte` untuk canonical, hreflang, dan locale Open Graph.
2. Update sitemap EN/ID.
3. Periksa robots.
4. Verifikasi direct visit, 404, redirect, dan API.

### Fase 7 — Quality assurance

Jalankan:

```powershell
npm.cmd run check
npm.cmd run build
```

Uji manual:

- `/about` berisi English dan `<html lang="en">`.
- `/id/about` berisi Indonesia dan `<html lang="id">`.
- Canonical setiap halaman menunjuk ke dirinya sendiri.
- Hreflang EN dan ID saling menunjuk.
- Language switcher mempertahankan kategori dan slug.
- Contact form tetap memanggil `/api/contact`.
- Refresh langsung pada `/id/...` tidak memberi 404.
- `/portfolio` dan `/id/portfolio` redirect ke bahasa services yang sesuai.
- Sitemap hanya memuat URL indexable.

## Kriteria selesai

- Tidak ada folder route fisik `src/routes/id`.
- Semua halaman publik memiliki pasangan EN dan ID.
- Tidak ada UI penting yang masih hardcoded dalam satu bahasa.
- Konten ID lengkap untuk layanan dan portfolio yang diindeks.
- Canonical, hreflang, metadata, dan JSON-LD benar untuk kedua bahasa.
- Sitemap mencakup URL EN dan ID.
- Redirect portfolio mempertahankan locale.
- `npm.cmd run check` menghasilkan 0 error dan 0 warning.
- Build produksi berhasil.
