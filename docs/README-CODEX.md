# README-CODEX.md

# Tujuan

Struktur dokumentasi dipisahkan agar AGENTS.md tetap kecil dan hanya berfungsi sebagai entry point untuk AI.

Seluruh aturan teknis dipindahkan ke folder `docs/` berdasarkan area tanggung jawab masing-masing.

Dengan struktur ini AI tidak perlu membaca seluruh dokumentasi untuk setiap tugas.

---

# Cara AI Menggunakan Docs

1. Mulai dari `AGENTS.md`.
2. Baca bagian **Documentation Routing**.
3. Tentukan jenis pekerjaan yang diminta user.
4. Baca hanya file di folder `docs/` yang dirujuk oleh routing tersebut.
5. Kerjakan tugas.
6. Jangan membaca dokumen lain kecuali memang dibutuhkan oleh routing atau tugas menyentuh lebih dari satu area.

---

# Kapan Membaca Docs

AI perlu membaca dokumen ketika:

- membutuhkan aturan implementasi
- membuat halaman baru
- membuat komponen
- mengubah struktur project
- mengubah SEO
- mengubah styling
- mengubah state management
- mengubah rendering
- mengubah adapter
- mengubah asset
- melakukan optimasi performa

---

# Kapan Tidak Perlu Membaca Docs

Tidak perlu membaca dokumen lain apabila:

- pertanyaan hanya bersifat umum
- perubahan hanya berupa teks sederhana
- tugas tidak menyentuh aturan teknis yang ada di folder `docs`

---

# Workflow Codex

1. Baca `AGENTS.md`.
2. Tentukan jenis task.
3. Ikuti Documentation Routing.
4. Baca hanya dokumen yang relevan.
5. Reuse komponen, helper, utility, dan struktur yang sudah ada sebelum membuat baru.
6. Lakukan implementasi.
7. Jalankan validasi.

```bash
npm.cmd run check
```

8. Jika keputusan arsitektur, routing, struktur data, atau implementasi penting tidak jelas, hentikan pekerjaan dan tanyakan kepada user.
