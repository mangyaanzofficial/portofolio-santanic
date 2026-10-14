# SANTANIC.ID — Portofolio

Situs statis (HTML + CSS + JS murni). Tidak perlu build; langsung deploy ke Vercel.

## Struktur
- `index.html` — kerangka halaman + SEO
- `css/style.css` — seluruh desain (token warna, kartu 3D, dock, responsif)
- `js/config.js` — **semua konten** (project, tim, kontak, FAQ, dll). Edit di sini saja
- `js/app.js` — logika (render, filter, dock, panel More, form)
- `js/icons.js`, `js/techlogos.js` — ikon Lucide & logo teknologi Simple Icons (inline, tanpa CDN)
- `img/` — gambar project & avatar
- `scripts/` — tes otomatis (opsional, butuh Playwright)

## Mengganti gambar
1. Unggah file ke folder `img/` (project/showcase 1200×800 JPG/WEBP < 150 KB; avatar 400×400).
2. Di `js/config.js`, isi `img: "img/nama-file.jpg"` pada project / showcase / tim.
Selama `img` kosong, otomatis tampil placeholder desain.

## Mengaktifkan kontak
Isi `contact.whatsapp`, `contact.telegram`, atau `contact.email` di `js/config.js`.
Selama kosong, form TIDAK mengklaim pesan terkirim (hanya menyediakan tombol salin pesan).

## Domain
Ganti `https://portofolio-santanic.vercel.app/` ke domain final di: `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt`, `sitemap.xml`, dan `js/config.js` (`url`).

## Deploy
Unggah isi folder ini ke repo GitHub yang terhubung ke Vercel (Framework Preset: Other, tanpa build command, output directory kosong/root).

## Tes (opsional)
```
python3 -m http.server 8000
python3 scripts/audit.py        # overflow, console, target sentuh di 8 viewport
python3 scripts/functional.py   # dock, panel More, filter, FAQ, form, lightbox
```
