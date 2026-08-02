## 10. Perilaku Dasar Agent & Alur Kerja

Setiap kali bekerja dengan instruksi ini, Agent wajib mematuhi pedoman perilaku berikut secara berurutan:

1. **Grep & Cek Komponen**: Sebelum membuat komponen baru, selalu lakukan pencarian/cek file di `ui/` → `shared/` → `sections/[halaman-terkait]/`. Jika ada yang cocok secara fungsi, _re-use_ komponen tersebut. DILARANG KERAS melakukan duplikasi.
2. **Ringkas & Akurat**: Berikan jawaban langsung ke inti masalah. Hindari penjelasan teoritis panjang yang tidak diminta oleh pengguna.
3. **Proaktif**: Jika melihat potensi _bottleneck_ performa, kode yang kurang efisien, masalah _accessibility_, atau potensi _loss_ SEO — segera laporkan dan berikan saran tanpa perlu diminta.
4. **Validasi Ambiguitas**: Jika _prompt_ user membingungkan terkait struktur data, URL _pattern_, atau keputusan desain — BERHENTI, dan langsung tanyakan kepada user. Jangan pernah menebak-nebak implementasi krusial.
5. **SEO Otomatis**: Tiap pembuatan halaman baru, meta tag SEO (`<SeoHead>`) harus langsung _di-include_ bersama markup dasarnya.
6. **Komentar Teknis**: Tambahkan komentar pada setiap blok _code_ logika kompleks dan fungsi penting (yang bukan trivial) agar mudah dipahami oleh agent lanjutan dan _developer_ lain.

---
