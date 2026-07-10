## 12. Struktur Media & Aset (`/static/`)

Semua aset statis (gambar, video, font) wajib disimpan di dalam folder `/static/` dan dikelompokkan secara ketat untuk menjaga keteraturan seiring berjalannya project.

### Struktur Direktori yang Wajib Diikuti:
```text
static/
├── images/
│   ├── global/                  # Aset yang dipakai di seluruh web (Logo, favicon, pattern background)
│   ├── pages/                   # Gambar spesifik per halaman
│   │   ├── home/                # Contoh: hero-bg.webp, about-section.webp
│   │   ├── service/             # Contoh: service-header.webp
│   │   └── contact/             # Contoh: office-location.webp
│   └── portfolio/               # Folder khusus untuk gambar portfolio
│       ├── [project-slug]/      # Nama folder WAJIB sama persis dengan [slug] project
│       │   ├── cover.webp
│       │   ├── mockup-1.webp
│       │   └── mockup-2.webp
├── icons/                       # Custom SVG icons (jika tidak menggunakan komponen Icon framework)
└── fonts/                       # Custom fonts lokal (.woff2)
```

### Aturan Penanganan Media:
1. **Format Modern:** Gunakan format `.webp` atau `.avif` untuk semua foto/gambar raster. DILARANG menggunakan `.png` atau `.jpg` untuk kebutuhan *production*, kecuali merupakan *fallback* yang mutlak.
2. **Vektor:** Gunakan format `.svg` untuk logo perusahaan, ikon, dan ilustrasi *flat*.
3. **Penamaan File SEO:** Nama file wajib menggunakan format `kebab-case` yang mengandung deskripsi/keyword SEO.
   - ✅ Benar: `jasa-pembuatan-website-jakarta.webp`
   - ❌ Salah: `IMG_001.webp` atau `banner_1.jpg`
4. **Lazy Loading:** Seluruh *media* yang berada di bawah *fold* layar wajib diberi atribut `loading="lazy"`. Atribut `loading="eager"` hanya boleh digunakan untuk *Hero Image* di bagian paling atas halaman.