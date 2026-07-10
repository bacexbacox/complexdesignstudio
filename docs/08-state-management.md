## 8. State Management, Error Handling & Loading States

- **Svelte 5 Global State**: Jangan gunakan fungsi `writable` (gaya Svelte 4) kecuali terpaksa. Untuk *state* yang perlu dibagikan di berbagai tempat (misalnya data keranjang atau user auth), buat file `.svelte.ts` murni dan gunakan pola *Shared State* atau *Context API* Svelte (`setContext`, `getContext`) dengan objek reaktif `$state`.
- **Error Boundaries**: Setiap route wajib ada `+error.svelte` minimal di root layout.
- Semua fetch di `+page.server.ts` wajib di-wrap dengan `try/catch` dan typed error response.
- Gunakan SvelteKit `error()` helper dari `@sveltejs/kit` untuk HTTP errors:

```ts
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const project = getProjectBySlug(params.category, params.slug);
  if (!project) throw error(404, 'Project tidak ditemukan');
  return { project };
};
```

- **Loading state lokal**: gunakan `$state(false)` untuk melacak loading di dalam suatu komponen, jangan gunakan *global store* untuk hal kecil.
- Selalu handle edge case: data kosong, array kosong, gambar gagal load.

---