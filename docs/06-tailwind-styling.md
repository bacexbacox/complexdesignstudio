## 6. Preferensi Styling (Tailwind CSS) & Animasi

- **Utility-first**: Gunakan utility classes Tailwind langsung untuk layout, spasi, tipografi.
- **Mobile-first**: Selalu mulai dari mobile (`base`), lalu naik ke `md:`, `lg:`, `xl:`.
- **Konsistensi token**: Gunakan nilai yang ada di Tailwind config, jangan hardcode nilai arbitrary (`[23px]`) kecuali benar-benar tidak ada padanan.
- **Jaga kebersihan markup**: Jika class string terlalu panjang (>10 class), pecah ke komponen Svelte terpisah atau gunakan `@apply` di CSS module.
- **Dark mode**: Siapkan struktur untuk `dark:` prefix sejak awal jika diperlukan.
- **Animasi (Tailwind vs Svelte)**:
  - Gunakan `transition-*` dan `animate-*` dari Tailwind **HANYA** untuk *state* mikro interaksi sederhana (misalnya efek *hover*, perubahan warna, atau *focus state*).
  - **WAJIB** gunakan Svelte *built-in transitions* (`in:fade`, `out:fly`, `animate:flip`, dll.) untuk elemen yang secara fisik ditambahkan atau dihilangkan dari DOM (misalnya elemen di dalam block `{#if}`). Hindari melakukan animasi kemunculan elemen murni menggunakan Tailwind classes untuk performa yang optimal.

---