## 9. Performa & Core Web Vitals

- **Fonts**: Load font via `<link rel="preconnect">` dan `font-display: swap`. Jangan muat lebih dari 2 typeface.
- **CLS (Cumulative Layout Shift)**: Jangan biarkan elemen bergeser saat load — set dimensi eksplisit pada semua media (berikan atribut `width` dan `height` pada `<img>`).
- **LCP (Largest Contentful Paint)**: Hero image wajib `loading="eager"` dan di-preload via `<link rel="preload">` di `<svelte:head>`.
- **Bundle size**: Hindari import library besar untuk kebutuhan kecil. Cek bundle size jika install dependency baru.

---