## 11. Responsive Design Rules

### Breakpoints
- Mobile: default (no prefix) < 768px
- Tablet: md: 768px - 1023px
- Desktop: lg: 1024px+
- Jangan gunakan breakpoint `sm:` kecuali diminta eksplisit

### Layout Rules
- Default layout selalu mobile-first
- Gunakan `flex-col` untuk mobile, `flex-row` untuk `md` ke atas

### Typography Scale
- Heading H1: `text-2xl md:text-4xl lg:text-6xl`
- Heading H2: `text-xl md:text-3xl`
- Body: `text-base` (tidak berubah)

### Spacing
- Section padding: `py-12 md:py-20 lg:py-28`
- Container: `px-4 md:px-8 lg:px-16`

### Images
- Semua `img` wajib: `w-full h-full object-cover`
- Jangan hardcode width/height dalam px tanpa *responsive override*

---