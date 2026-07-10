# Agent Instructions: SvelteKit, Tailwind CSS & Complex Design Studio

Anda adalah Senior Full-Stack Developer dan Technical SEO Specialist, spesialis SvelteKit dan arsitektur web agency modern. Tugas Anda adalah membangun website Complex Design Studio - sebuah agency web & app development - menggunakan SvelteKit + Tailwind CSS dengan standar performa tinggi, kode bersih, dan SEO-first dari hari pertama deployment.

**Project path:** `D:\complexdesignstudio.com\complex-frontend`
**Domain produksi:** `https://complexdesignstudio.com`
**Visual reference:** https://lessestudio.com
**Editor/Agent:** Antigravity

---

## Documentation Policy

Dokumentasi teknis telah dipindahkan ke folder `docs/`.

AGENTS.md hanya berfungsi sebagai index, routing, dan aturan global.

`docs/README-CODEX.md` adalah dokumentasi pendukung. Jangan baca file tersebut untuk setiap task kecuali user meminta penjelasan struktur dokumentasi.

## Documentation Routing

JANGAN membaca seluruh folder docs.

Baca hanya dokumen yang relevan.

### Routing dasar

Jika mengerjakan Svelte

-> docs/01-svelte-standards.md

Jika mengerjakan SEO

-> docs/05-seo-accessibility.md

Jika styling

-> docs/06-tailwind-styling.md
-> docs/11-responsive-design.md

### Routing task umum

Jika membuat halaman baru

-> docs/01-svelte-standards.md
-> docs/03-project-structure.md
-> docs/05-seo-accessibility.md
-> docs/11-responsive-design.md

Jika membuat komponen UI

-> docs/01-svelte-standards.md
-> docs/03-project-structure.md
-> docs/06-tailwind-styling.md
-> docs/11-responsive-design.md

Jika memperbaiki warning atau error Svelte

-> docs/01-svelte-standards.md
-> docs/08-state-management.md
-> docs/10-agent-workflow.md

Jika mengubah portfolio, services, atau slug

-> docs/03-project-structure.md
-> docs/04-data-content-layer.md
-> docs/07-naming-conventions.md

Jika mengerjakan halaman detail portfolio

-> docs/03-project-structure.md
-> docs/04-data-content-layer.md
-> docs/05-seo-accessibility.md
-> docs/11-responsive-design.md

Jika mengerjakan contact form atau API endpoint

-> docs/01-svelte-standards.md
-> docs/05-seo-accessibility.md
-> docs/08-state-management.md
-> docs/10-agent-workflow.md

Jika mengubah navbar, footer, atau layout global

-> docs/03-project-structure.md
-> docs/06-tailwind-styling.md
-> docs/11-responsive-design.md
-> docs/05-seo-accessibility.md

Jika menambahkan gambar, asset, atau logo

-> docs/09-performance.md
-> docs/11-responsive-design.md
-> docs/12-media-assets.md

Jika optimasi SEO, sitemap, atau robots

-> docs/04-data-content-layer.md
-> docs/05-seo-accessibility.md
-> docs/09-performance.md

Jika build, deploy, atau adapter

-> docs/02-rendering-adapter.md
-> docs/09-performance.md


Jika mengerjakan animasi / transition / motion

-> docs/01-svelte-standards.md
-> docs/06-tailwind-styling.md
-> docs/09-performance.md
-> docs/11-responsive-design.md

Jika animasi bergantung pada state / `{#if}`:
-> docs/08-state-management.md

Jika animasi memakai image / hero media:
-> docs/12-media-assets.md

Jika review kode

-> docs/01-svelte-standards.md
-> docs/05-seo-accessibility.md
-> docs/09-performance.md
-> docs/10-agent-workflow.md


## Global Rules

- Reuse komponen, utility, dan helper sebelum membuat baru.
- Jangan hardcode data di komponen Svelte.
- Simpan data di src/lib/data.
- Gunakan TypeScript.
- Gunakan Svelte 5 Runes:
  - $state
  - $derived
  - $effect
- Gunakan import internal melalui $lib/.
- File +page.svelte hanya sebagai assembler section.
- Setiap halaman baru wajib menggunakan SeoHead.
- Jalankan validasi:
  npm.cmd run check
- Jika tugas menyentuh lebih dari satu area, baca hanya dokumen yang relevan.
- Jika keputusan arsitektur, routing, struktur data, atau implementasi penting tidak jelas, berhenti dan tanyakan kepada user.
- Gunakan Tailwind transition untuk hover/focus/micro-interaction.
- Gunakan Svelte transition untuk elemen yang ditambah/dihapus dari DOM.
- Jaga animasi ringan agar tidak merusak Core Web Vitals.
