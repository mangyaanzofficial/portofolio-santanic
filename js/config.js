/* ==========================================================================
   SANTANIC.ID — KONFIGURASI KONTEN
   Semua teks, project, tim, kontak, dan FAQ diedit di file ini saja.
   Tidak perlu menyentuh index.html / app.js untuk mengganti isi.

   CARA GANTI GAMBAR
   - Taruh file di folder  img/  lalu isi nama file di bawah (mis. "img/santanic-store.jpg").
   - Rasio gambar project/showcase: 3:2 (disarankan 1200 × 800 px, JPG/WEBP, < 150 KB).
   - Avatar tim: persegi (disarankan 400 × 400 px).
   - Selama file belum ada, otomatis tampil placeholder desain (bukan kotak kosong).

   ATURAN ISI
   - Kosongkan daftar ([]) bila datanya memang belum ada: section tampil empty state.
   - Jangan isi testimoni / tautan sosial yang tidak nyata.
   ========================================================================== */
window.SITE = {
  name: "SANTANIC.ID",
  url: "https://portofolio-santanic.vercel.app/", // ganti ke domain final saat sudah dipasang
  logoImg: "", // opsional: "img/logo.svg" untuk mengganti logo teks
  label: "INDEPENDENT DIGITAL STUDIO",
  tagline: "Building Digital Experiences Beyond Limits.",
  heroDesc:
    "Studio digital independen yang berfokus pada website, bot, sistem otomatisasi, dan solusi digital kreatif.",

  /* ---------- KONTAK (isi yang tersedia saja) ---------- */
  contact: {
    whatsapp: "6285718072088", // contoh: "https://wa.me/62812xxxxxxx"
    telegram: "https://t.me/CsSantanic", // contoh: "https://t.me/username"
    email: "officialsantanic@gmail.com", //    contoh: "halo@santanic.id"
  },

  /* ---------- ABOUT ---------- */
  about: {
    headline: "Studio kecil, karya yang dibangun serius.",
    text: "SANTANIC.ID adalah brand pengembangan digital yang berfokus pada teknologi, website development, sistem otomatisasi, bot, dan berbagai solusi digital kreatif.",
    vision:
      "Menjadi brand pengembangan digital yang dipercaya lewat karya yang rapi dan bisa diandalkan.",
    mission:
      "Membangun website, sistem otomatisasi, dan alat digital yang berguna, mudah dipakai, dan mudah dikembangkan.",
    // [ikon, judul, deskripsi]
    values: [
      ["lightbulb", "Innovation", "Mencari cara baru yang lebih efektif."],
      ["shield-check", "Reliability", "Sistem yang stabil dan dapat diandalkan."],
      ["palette", "Creativity", "Tampilan dan solusi dengan karakter."],
      ["handshake", "Collaboration", "Bekerja bersama klien dan tim."],
    ],
  },

  /* ---------- PROJECTS ----------
     status: "Online" | "Segera hadir" (bebas diisi)
     url   : kosongkan bila belum ada → tombol jadi "Segera hadir"
     img   : gambar utama (3:2). thumb: versi kecil opsional untuk kartu. */
  projects: [
    {
      name: "SANTANIC STORE",
      cat: "Website",
      desc: "Solusi digital untuk panel Pterodactyl, jasa pembuatan, dan kebutuhan hosting dengan performa stabil, harga bersahabat, dan layanan praktis.",
      tech: ["Vercel"],
      status: "Online",
      url: "https://santanic-pterodactyl-shop-lvpm-five.vercel.app/",
      img: "img/santanic-store.jpg" /* isi "img/santanic-store.jpg" setelah file diunggah */,
    },
    {
      name: "SANTANIC PPOB",
      cat: "Website",
      desc: "SANTANIC PPOB akan hadir sebagai layanan digital untuk memenuhi berbagai kebutuhan transaksi dalam satu platform. Mulai dari top up e-wallet, pulsa, paket data, token listrik, pembayaran tagihan, voucher game, hingga berbagai layanan digital lainnya.",
      tech: [],
      status: "Segera hadir",
      url: "",
      img: "img/santanic-store-ppob.jpg" /* isi "img/santanic-store-ppob.jpg" setelah file diunggah */,
    },
    {
      name: "SANTANIC SCRIPT FREE",
      cat: "Tools",
      desc: "Kumpulan script gratis super premium, full update, siap di run/digunakan dan bebas rename.",
      tech: ["Vercel"],
      status: "Online",
      url: "https://santanicscriptfree.vercel.app/",
      img: "img/santanic-scriptfree.jpg" /* isi "img/santanic-scriptfree.jpg" setelah file diunggah */,
    },
    {
      name: "AM PREM SUIKA",
      cat: "Website",
      desc: "Website panduan aktivasi Alight Motion Premium: gratis, unofficial, lengkap dengan langkah demi langkah, FAQ, dan status API.",
      note: "Dibuat oleh SuikaRyp. Layanan unofficial dan tidak berafiliasi dengan Alight Creative / Alight Motion.",
      tech: ["Vercel"],
      status: "Online",
      url: "https://amprem-suika.vercel.app/",
      img: "img/am-premium.jpg",
      thumb: "img/am-premium-sm.jpg",
    },
  ],

  /* ---------- SERVICES: [ikon, judul, deskripsi] ---------- */
  services: [
    ["code-xml", "Website Development", "Website cepat dan responsif untuk berbagai kebutuhan."],
    ["layout-template", "Web UI/UX Design", "Desain antarmuka yang jelas dan nyaman dipakai."],
    ["bot", "Bot Development", "Bot untuk kebutuhan komunitas dan layanan."],
    ["workflow", "Automation Systems", "Otomatisasi tugas yang berulang."],
    ["wrench", "Digital Tools", "Alat digital yang disesuaikan dengan kebutuhan."],
    ["refresh-cw", "Website Maintenance", "Perawatan dan pembaruan secara berkala."],
    ["life-buoy", "Technical Support", "Bantuan teknis saat dibutuhkan."],
    ["sparkles", "Custom Digital Solutions", "Solusi khusus untuk ide Anda."],
  ],

  /* ---------- TEAM ----------
     img  : avatar (persegi). c: warna placeholder avatar.
     links: isi hanya yang nyata, contoh { Instagram: "https://instagram.com/..." } */
  team: [
    {
      name: "Yaanz Official",
      role: "Founder & Lead Developer",
      bio: "Memimpin arah teknis dan pengembangan produk SANTANIC.ID.",
      img: "" /* isi "img/yaanz.jpg" setelah file diunggah */,
      links: {},
      c: "#c6ff3d",
    },
    {
      name: "Yoga Official",
      role: "Developer",
      bio: "Mengembangkan fitur dan antarmuka untuk project SANTANIC.ID.",
      img: "" /* isi "img/yoga.jpg" setelah file diunggah */,
      links: {},
      c: "#f3f2ea",
    },
    {
      name: "SuikaRyp",
      role: "Developer",
      bio: "Mengembangkan website dan sistem untuk project SANTANIC.ID.",
      img: "" /* isi "img/suikaryp.jpg" setelah file diunggah */,
      links: {},
      c: "#9aa3ff",
    },
    {
      name: "Fahmi Shop",
      role: "Support",
      bio: "Mendampingi pengguna dan klien dengan dukungan layanan.",
      img: "" /* isi "img/fahmi.jpg" setelah file diunggah */,
      links: {},
      c: "#ffb86b",
    },
  ],

  /* ---------- SKILLS: nama harus cocok dengan js/techlogos.js; selain itu pakai ikon ---------- */
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "GitHub",
    "Vercel",
    ["API & Database", "database"],
  ],

  /* ---------- EXPERIENCE (tanpa riwayat kerja/tahun karangan) ---------- */
  journey: [
    ["Fondasi", "SANTANIC.ID dibentuk sebagai brand pengembangan digital dengan fokus website, bot, dan otomatisasi."],
    ["Membangun produk", "Mengembangkan project seperti Store, PPOB, dan Uploader."],
    ["Berkembang", "Memperluas layanan dan terbuka untuk kolaborasi project baru."],
  ],
  process: [
    ["message-circle", "Diskusi kebutuhan", "Memahami tujuan, kebutuhan, dan batasan project."],
    ["pen-tool", "Rancang", "Menyepakati ruang lingkup dan arah tampilan."],
    ["hammer", "Bangun bertahap", "Pengerjaan per tahap supaya progres mudah dipantau."],
    ["rocket", "Serah terima", "Rilis, serah terima, dan dukungan setelahnya."],
  ],

  /* ---------- SHOWCASE: gambar preview. Isi `img` dengan screenshot project ---------- */
  showcase: [
    { t: "AM PREM SUIKA", cat: "Website", img: "img/am-premium.jpg", thumb: "img/am-premium-sm.jpg", cap: "Halaman utama AM Premium Free." },
    { t: "SANTANIC STORE", cat: "Website", img: "img/santanic-store.jpg" /* isi "img/santanic-store.jpg" setelah file diunggah */, cap: "Halaman Utama Santanic Pterodactyl" },
    { t: "SANTANIC PPOB", cat: "Website", img: "img/santanic-store-ppob.jpg" /* isi "img/santanic-store-ppob.jpg" setelah file diunggah */, cap: "Halaman Utama Santanic PPOB Termurah" },
    { t: "SANTANIC SCRIPT FREE", cat: "Tools", img: "img/santanic-scriptfree.jpg" /* isi "img/santanic-uploader.jpg" setelah file diunggah */, cap: "Halaman Utama Kumpulan Script Free" },
  ],

  /* ---------- UPDATES: { date:"2026-10-13", title:"…", cat:"Website", status:"Released" } ---------- */
  updates: [
  { date: "2026-09-30", title: "Santanic Pterodactyl", cat: "Website", status: "Released" },
  { date: "2026-10-01", title: "Kumpulan Script Free", cat: "Website", status: "Released" },
  { date: "2026-10-14", title: "Alight Motion Premium Free", cat: "Website", status: "New" },
  { date: "Segera Hadir", title: "Santanic PPOB", cat: "Website", status: "Segera" },
  { date: "Segera Hadir", title: "Suika Wave", cat: "Web app", status: "Segera" },
  { date: "Segera Hadir", title: "Suika Move", cat: "Web app", status: "Segera" },
],

  /* ---------- TESTIMONIALS: { name:"Nama asli", text:"Kutipan asli" } — hanya testimoni nyata ---------- */
  testimonials: [
  {
    name: "Rizky Official",
    text: "Pelayanan cepat dan proses order mudah. Panel Pterodactyl-nya juga gampang digunakan, cocok buat yang baru mulai."
  },
  {
    name: "Fajar Code",
    text: "Harga cukup terjangkau dengan fitur yang sesuai kebutuhan. Admin juga responsif saat saya bertanya."
  },
  {
    name: "Dimas Hosting",
    text: "Order berjalan dengan mudah dan prosesnya praktis. Cocok untuk kebutuhan server game dan pengelolaan bot."
  },
  {
    name: "Ryuu Js",
    text: "Sangat membantu untuk kebutuhan server. Informasi paketnya jelas dan pelayanan admin cukup baik."
  },
  {
    name: "Reza Developer",
    text: "Pengalaman menggunakan layanan SANTANIC cukup memuaskan. Pilihan paketnya beragam dan harganya ramah di kantong."
  }
],

  /* ---------- FAQ: [pertanyaan, jawaban] ---------- */
  faq: [
    ["Layanan apa saja yang tersedia?", "Website development, desain UI/UX, bot, otomatisasi, tools digital, maintenance, dan dukungan teknis."],
    ["Bagaimana proses kerja sama?", "Diskusi kebutuhan, kesepakatan ruang lingkup, pengerjaan bertahap, lalu serah terima."],
    ["Bagaimana cara menghubungi tim?", "Lewat tombol kontak di bagian Contact."],
    ["Project apa yang bisa dikerjakan?", "Website, bot, sistem otomatisasi, dan alat digital kustom."],
    ["Apakah ada maintenance?", "Tersedia sebagai layanan terpisah sesuai kebutuhan."],
  ],
};
