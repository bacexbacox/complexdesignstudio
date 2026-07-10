## 2. Rendering Strategy & Adapter

Website Complex Design Studio adalah **static-first** — konten tidak berubah real-time, sehingga halaman wajib di-prerender untuk performa dan SEO maksimal.

### Aturan Prerender

```ts
// src/routes/+layout.ts — aktifkan prerender secara global
export const prerender = true;
export const trailingSlash = 'never';
```

Pengecualian — matikan prerender hanya untuk route yang benar-benar dinamis:

```ts
// Contoh: src/routes/api/contact/+server.ts (form submission endpoint)
export const prerender = false;
```

### Adapter

Gunakan `@sveltejs/adapter-auto` untuk development. Untuk deployment production, sesuaikan:

| Platform deploy | Adapter |
|---|---|
| Vercel | `@sveltejs/adapter-vercel` |
| Netlify | `@sveltejs/adapter-netlify` |
| Cloudflare Pages | `@sveltejs/adapter-cloudflare` |
| VPS / Node server | `@sveltejs/adapter-node` |

**Konfirmasi ke user platform mana yang digunakan sebelum menulis konfigurasi adapter.**

---