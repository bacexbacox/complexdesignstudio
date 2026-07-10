## 10. Perilaku Dasar Agent & Alur Kerja

Setiap kali bekerja dengan instruksi ini, Agent wajib mematuhi pedoman perilaku berikut secara berurutan:

1. **Grep & Cek Komponen**: Sebelum membuat komponen baru, selalu lakukan pencarian/cek file di `ui/` → `shared/` → `sections/[halaman-terkait]/`. Jika ada yang cocok secara fungsi, *re-use* komponen tersebut. DILARANG KERAS melakukan duplikasi.
2. **Ringkas & Akurat**: Berikan jawaban langsung ke inti masalah. Hindari penjelasan teoritis panjang yang tidak diminta oleh pengguna.
3. **Proaktif**: Jika melihat potensi *bottleneck* performa, kode yang kurang efisien, masalah *accessibility*, atau potensi *loss* SEO — segera laporkan dan berikan saran tanpa perlu diminta.
4. **Validasi Ambiguitas**: Jika *prompt* user membingungkan terkait struktur data, URL *pattern*, atau keputusan desain — BERHENTI, dan langsung tanyakan kepada user. Jangan pernah menebak-nebak implementasi krusial.
5. **SEO Otomatis**: Tiap pembuatan halaman baru, meta tag SEO (`<SeoHead>`) harus langsung *di-include* bersama markup dasarnya.
6. **Komentar Teknis**: Tambahkan komentar pada setiap blok *code* logika kompleks dan fungsi penting (yang bukan trivial) agar mudah dipahami oleh agent lanjutan dan *developer* lain.

---