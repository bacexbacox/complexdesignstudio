## 1. Standar Penulisan SvelteKit

- **Svelte 5 Runes wajib**: Gunakan `$state` untuk reaktivitas, `$derived` untuk nilai turunan, `$effect` untuk side-effects. Jangan gunakan sintaks Svelte 4 (`writable`, `readable`, `onMount` kecuali benar-benar diperlukan).
- **TypeScript ketat**: Semua file `.svelte`, `.ts`, dan `.server.ts` wajib menggunakan TypeScript. Type-safety dijaga penuh pada props, API response, dan data layer.
- **Komponen modular**: Pecah UI menjadi komponen kecil yang reusable. Jangan duplikasi markup yang sama di lebih dari satu halaman.
- **Jangan buat komponen baru** jika komponen yang sudah ada di `src/lib/components/` sudah mencakup kebutuhan tersebut. Cek terlebih dahulu.
- **Data fetching**: Gunakan `+page.server.ts` untuk server-side data fetching. Gunakan `+server.ts` untuk API endpoints. Jangan fetch di dalam komponen Svelte kecuali untuk data yang benar-benar client-side.
- **Layout**: Gunakan `+layout.svelte` dan `+layout.ts` untuk struktur halaman yang diwarisi.
- **Heading hierarchy**: Satu `<h1>` per halaman. Gunakan `<h2>`, `<h3>` secara berurutan. Jangan skip level.
- **Import alias wajib**: Selalu gunakan `$lib/` untuk import internal — jangan pernah gunakan relative path seperti `../../components/`. Contoh benar: `import { services } from '$lib/data/services'`.

---