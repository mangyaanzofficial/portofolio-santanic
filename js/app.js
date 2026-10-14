/* SANTANIC.ID — app.js
   Render semua section dari window.SITE (js/config.js). Tanpa framework, tanpa CDN. */
(function () {
  "use strict";
  var S = window.SITE, ICONS = window.ICONS || {}, LOGOS = window.TECH_LOGOS || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ic(n, extra) {
    return '<svg class="i ' + (extra || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || "") + "</svg>";
  }
  function safeUrl(u) { return /^(https?:\/\/|mailto:|\/|img\/)/i.test(u || "") ? u : ""; }
  function set(sel, html) { var el = $(sel); if (el) el.innerHTML = html; return el; }

  /* ---------- navigasi ---------- */
  var NAV = [
    ["home", "Home", "house"], ["about", "About", "info"], ["projects", "Projects", "folder-kanban"],
    ["services", "Services", "briefcase"], ["team", "Team", "users"], ["skills", "Skills", "cpu"],
    ["experience", "Experience", "route"], ["showcase", "Showcase", "images"], ["updates", "Updates", "bell"],
    ["testimonials", "Testimonials", "message-square-quote"], ["faq", "FAQ", "circle-help"], ["contact", "Contact", "mail"]
  ];
  var DOCK = ["home", "projects", "services", "team"];
  var MORE = ["about", "skills", "experience", "showcase", "updates", "testimonials", "faq", "contact"];
  var BAR = ["about", "projects", "services", "team", "skills", "faq"];
  var navOf = function (id) { return NAV.filter(function (n) { return n[0] === id; })[0]; };

  /* ---------- brand & hero ---------- */
  var brandHTML = S.logoImg
    ? '<img src="' + esc(S.logoImg) + '" alt="' + esc(S.name) + '">'
    : '<span class="brand__m" aria-hidden="true">S</span><span>SANTANIC<b>.ID</b></span>';
  $$(".brand").forEach(function (b) { b.innerHTML = brandHTML; });
  $("#heroLabel").textContent = S.label;
  $("#heroDesc").textContent = S.heroDesc;
  $("#ctaA").innerHTML = "Jelajahi Project " + ic("arrow-down-right");
  $("#ctaB").innerHTML = "Kenali Tim " + ic("users");
  $("#svCta").innerHTML = "Diskusikan project " + ic("message-circle");
  $("#fSend").innerHTML = "Kirim pesan " + ic("send");
  $("#barMenu").innerHTML = ic("layout-grid") + " Menu";
  $('[data-go="contact"].btn--sm').innerHTML = "Contact " + ic("mail");
  $("#sheetX").innerHTML = ic("x"); $("#dx").innerHTML = ic("x"); $("#lbX").innerHTML = ic("x");
  $("#lbP").innerHTML = ic("chevron-left"); $("#lbN").innerHTML = ic("chevron-right");
  $$("[data-i]").forEach(function (el) { el.innerHTML = ic(el.dataset.i); });
  $("#yr").textContent = new Date().getFullYear();
  $("#ft1").textContent = S.tagline;

  /* ---------- About ---------- */
  var A = S.about;
  $("#aboutHead").textContent = A.headline;
  $("#aboutText").textContent = A.text;
  set("#aboutVM",
    [["eye", "Visi", A.vision], ["flag", "Misi", A.mission]].map(function (v) {
      return '<article class="card card--focus vm"><div class="tile">' + ic(v[0]) + "</div><div><h3>" + v[1] + "</h3><p>" + esc(v[2]) + "</p></div></article>";
    }).join(""));
  set("#values", A.values.map(function (v) {
    return '<article class="card val"><div class="tile">' + ic(v[0]) + "</div><h3>" + esc(v[1]) + "</h3><p>" + esc(v[2]) + "</p></article>";
  }).join(""));

  /* ---------- visual: gambar + placeholder desain ---------- */
  function shortName(n) {
    var w = String(n).trim().split(/\s+/);
    if (/^santanic$/i.test(w[0]) && w.length > 1) return w[w.length - 1];
    return w.map(function (x) { return x[0]; }).join("").slice(0, 3);
  }
  function shot(item, i, opts) {
    opts = opts || {};
    var name = item.name || item.t;
    var src = opts.full ? item.img : (item.thumb || item.img);
    return '<div class="shot shot--' + (i % 4) + '">' +
      '<div class="ph" aria-hidden="true"><div class="ph__bar"><i></i><i></i><i></i><span>' + esc(name.toLowerCase().replace(/\s+/g, "-")) + '</span></div>' +
      '<div class="ph__body"><b class="ph__ini">' + esc(shortName(name)) + '</b><span class="ph__lines"><i></i><i></i></span></div>' +
      '<span class="ph__tag">Preview segera hadir</span></div>' +
      (src ? '<img data-shot src="' + esc(src) + '" alt="Tampilan ' + esc(name) + '" width="1200" height="800" loading="' + (opts.eager ? "eager" : "lazy") + '" decoding="async">' : "") +
      "</div>";
  }
  function hydrate(root) {
    $$("img[data-shot]", root).forEach(function (img) {
      var host = img.closest(".shi");
      function ok() { if (host) host.classList.add("is-ready"); img.dataset.ok = "1"; }
      function bad() { img.remove(); }
      if (img.complete) { img.naturalWidth ? ok() : bad(); }
      else { img.addEventListener("load", ok, { once: true }); img.addEventListener("error", bad, { once: true }); }
    });
  }

  /* ---------- Projects ---------- */
  var pCat = "All", cats = ["All"].concat(S.projects.map(function (p) { return p.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  set("#pf", cats.map(function (c) { return '<button class="chip" type="button" aria-pressed="' + (c === "All") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join(""));
  function renderProjects() {
    var q = $("#q").value.trim().toLowerCase();
    var list = S.projects.map(function (p, i) { return [p, i]; }).filter(function (x) {
      var p = x[0];
      return (pCat === "All" || p.cat === pCat) && (p.name + " " + p.cat + " " + p.desc + " " + p.tech.join(" ")).toLowerCase().indexOf(q) > -1;
    });
    $("#pCount").textContent = list.length + " dari " + S.projects.length + " project";
    set("#pg", list.length ? list.map(function (x) {
      var p = x[0], i = x[1], on = p.status === "Online";
      return '<article class="card card--lift pcard">' + shot(p, i, { eager: i < 2 }) +
        '<div class="pcard__bd"><div class="tags"><span class="tag ' + (on ? "tag--ac" : "") + '">' + esc(p.status) + '</span><span class="tag">' + esc(p.cat) + "</span></div>" +
        "<h3>" + esc(p.name) + "</h3><p>" + esc(p.desc) + "</p>" +
        (p.tech.length ? '<div class="tags">' + p.tech.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
        '<div class="pcard__act">' +
        (safeUrl(p.url) ? '<a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Kunjungi ' + ic("external-link") + "</a>" : '<span class="btn" aria-disabled="true">Segera hadir</span>') +
        '<button class="btn btn--paper" type="button" data-d="' + i + '">Detail</button></div></div></article>';
    }).join("") : '<div class="empty" style="grid-column:1/-1"><div class="tile">' + ic("search") + '</div><div><h3>Tidak ada project yang cocok</h3><p>Coba kata kunci lain atau pilih kategori Semua.</p><p style="margin-top:14px"><button class="btn btn--sm btn--paper" type="button" id="pReset">Reset pencarian</button></p></div></div>');
    hydrate($("#pg"));
  }
  $("#pf").addEventListener("click", function (e) {
    var b = e.target.closest("[data-c]"); if (!b) return;
    pCat = b.dataset.c;
    $$("#pf .chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    renderProjects();
  });
  $("#q").addEventListener("input", renderProjects);
  $("#pg").addEventListener("click", function (e) {
    if (e.target.closest("#pReset")) { $("#q").value = ""; pCat = "All"; $$("#pf .chip").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.c === "All"); }); renderProjects(); return; }
    var b = e.target.closest("[data-d]"); if (!b) return;
    var p = S.projects[b.dataset.d], i = +b.dataset.d;
    $("#dc").innerHTML = shot(p, i, { full: true, eager: true }) +
      '<div class="dlg__bd"><div class="tags"><span class="tag ' + (p.status === "Online" ? "tag--ac" : "") + '">' + esc(p.status) + '</span><span class="tag">' + esc(p.cat) + "</span></div>" +
      '<h3 id="dT">' + esc(p.name) + "</h3><p>" + esc(p.desc) + "</p>" +
      (p.note ? '<p class="note">' + esc(p.note) + "</p>" : "") +
      "<p><strong>Teknologi:</strong> " + (p.tech.length ? esc(p.tech.join(", ")) : "belum diisi") + "</p>" +
      (safeUrl(p.url) ? '<a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Kunjungi project ' + ic("external-link") + "</a>" : "") + "</div>";
    hydrate($("#dc")); openDlg($("#dlg"));
  });

  /* ---------- dialog (project & lightbox) ---------- */
  var lastFocus = null;
  function openDlg(d) { lastFocus = document.activeElement; document.documentElement.classList.add("lock"); d.showModal(); }
  [$("#dlg"), $("#lb")].forEach(function (d) {
    d.addEventListener("close", function () { document.documentElement.classList.remove("lock"); if (lastFocus && lastFocus.focus) lastFocus.focus(); });
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  });
  $("#dx").onclick = function () { $("#dlg").close(); };
  $("#lbX").onclick = function () { $("#lb").close(); };

  /* ---------- Services ---------- */
  set("#sv", S.services.map(function (s) {
    return '<article class="card card--lift svc"><div class="tile">' + ic(s[0]) + "</div><div><h3>" + esc(s[1]) + "</h3><p>" + esc(s[2]) + "</p></div></article>";
  }).join(""));

  /* ---------- Team ---------- */
  set("#tm", S.team.map(function (m, i) {
    var links = Object.keys(m.links || {}).filter(function (k) { return safeUrl(m.links[k]); }).map(function (k) {
      return '<a href="' + esc(m.links[k]) + '" target="_blank" rel="noopener noreferrer">' + esc(k) + "</a>";
    }).join("");
    return '<article class="card card--lift tcard' + (i === 0 ? " tcard--lead" : "") + '">' +
      '<div class="av" style="--c:' + esc(m.c || "#c6ff3d") + '"><b>' + esc(m.name.charAt(0)) + "</b>" +
      (m.img ? '<img data-shot src="' + esc(m.img) + '" alt="Foto ' + esc(m.name) + '" width="400" height="400" loading="lazy" decoding="async">' : "") + "</div>" +
      "<div><h3>" + esc(m.name) + '</h3><div class="role">' + esc(m.role) + "</div><p>" + esc(m.bio) + "</p>" + (links ? '<div class="links">' + links + "</div>" : "") + "</div></article>";
  }).join(""));
  hydrate($("#tm"));

  /* ---------- Skills (logo resmi Simple Icons) ---------- */
  function lum(hex) {
    var c = [0, 2, 4].map(function (k) { var v = parseInt(hex.substr(k, 2), 16) / 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  set("#sk", S.skills.map(function (s) {
    var name = Array.isArray(s) ? s[0] : s, fb = Array.isArray(s) ? s[1] : "cpu", logo = LOGOS[name], tile;
    if (logo) {
      var L = lum(logo.hex), bg = L < .06 ? "#f3f2ea" : "#" + logo.hex, fg = L < .06 ? "#000" : (L > .22 ? "#000" : "#fff");
      tile = '<span class="sk__l" style="background:' + bg + '"><svg viewBox="0 0 24 24" fill="' + fg + '" aria-hidden="true"><path d="' + logo.d + '"/></svg></span>';
    } else tile = '<span class="sk__l" style="background:#c6ff3d;color:#000">' + ic(fb) + "</span>";
    return '<li class="card sk">' + tile + "<strong>" + esc(name) + "</strong></li>";
  }).join(""));

  /* ---------- Experience ---------- */
  set("#exJ", S.journey.map(function (j) { return '<li><div class="card"><h3>' + esc(j[0]) + "</h3><p>" + esc(j[1]) + "</p></div></li>"; }).join(""));
  set("#exP", S.process.map(function (p) { return '<li class="card step"><div class="tile">' + ic(p[0]) + "</div><div><h3>" + esc(p[1]) + "</h3><p>" + esc(p[2]) + "</p></div></li>"; }).join(""));

  /* ---------- Showcase + lightbox ---------- */
  var shCat = "All", shCats = ["All"].concat(S.showcase.map(function (s) { return s.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  set("#shf", shCats.map(function (c) { return '<button class="chip" type="button" aria-pressed="' + (c === "All") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join(""));
  function shList() { return S.showcase.map(function (s, i) { return [s, i]; }).filter(function (x) { return shCat === "All" || x[0].cat === shCat; }); }
  function renderShowcase() {
    set("#sh", shList().map(function (x) {
      var s = x[0], i = x[1], it = { name: s.t, img: s.img, thumb: s.thumb };
      return '<button type="button" class="card shi" data-s="' + i + '" aria-label="Perbesar ' + esc(s.t) + '">' + shot(it, i) +
        '<span class="shi__zoom">' + ic("maximize-2") + '</span><span class="shi__cap"><strong>' + esc(s.t) + '</strong><span class="tag">' + esc(s.cat) + "</span></span></button>";
    }).join(""));
    hydrate($("#sh"));
  }
  $("#shf").addEventListener("click", function (e) {
    var b = e.target.closest("[data-c]"); if (!b) return;
    shCat = b.dataset.c; $$("#shf .chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); renderShowcase();
  });
  var lbIdx = -1;
  function lbReadyList() { return $$("#sh .shi.is-ready").map(function (b) { return +b.dataset.s; }); }
  function lbShow(i) {
    var s = S.showcase[i]; lbIdx = i;
    $("#lbImg").src = s.img; $("#lbImg").alt = "Tampilan " + s.t;
    $("#lbCap").textContent = s.t + (s.cap ? " — " + s.cap : "");
    var l = lbReadyList(); $("#lbP").hidden = $("#lbN").hidden = l.length < 2;
  }
  $("#sh").addEventListener("click", function (e) {
    var b = e.target.closest(".shi.is-ready"); if (!b) return;
    lbShow(+b.dataset.s); openDlg($("#lb"));
  });
  function lbStep(d) { var l = lbReadyList(); if (l.length < 2) return; lbShow(l[(l.indexOf(lbIdx) + d + l.length) % l.length]); }
  $("#lbP").onclick = function () { lbStep(-1); }; $("#lbN").onclick = function () { lbStep(1); };
  $("#lb").addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") lbStep(-1); if (e.key === "ArrowRight") lbStep(1); });

  /* ---------- Updates & Testimonials (empty state bila kosong) ---------- */
  set("#up", S.updates.length
    ? '<div class="ulist">' + S.updates.map(function (u) {
      return '<article class="card upd"><div class="tags"><span class="tag tag--ac">' + esc(u.status) + '</span><span class="tag">' + esc(u.cat) + "</span></div><h3>" + esc(u.title) + '</h3><time datetime="' + esc(u.date) + '">' + esc(new Date(u.date).toLocaleDateString("id-ID", { dateStyle: "long" })) + "</time></article>";
    }).join("") + "</div>"
    : '<div class="empty"><div class="tile">' + ic("bell") + '</div><div><h3>Belum ada pembaruan</h3><p>Catatan rilis dan perkembangan project SANTANIC.ID akan muncul di sini.</p></div></div>');
  set("#ts", S.testimonials.length
    ? '<div class="tq">' + S.testimonials.map(function (t) {
      return '<figure class="card card--focus"><blockquote>“' + esc(t.text) + "”</blockquote><figcaption>" + esc(t.name) + "</figcaption></figure>";
    }).join("") + "</div>"
    : '<div class="empty"><div class="tile">' + ic("message-square-quote") + '</div><div><h3>Testimoni segera hadir</h3><p>Kami hanya menampilkan testimoni asli dari klien. Belum ada yang dipublikasikan.</p></div></div>');

  /* ---------- FAQ (satu terbuka sekaligus) ---------- */
  set("#fq", S.faq.map(function (f) {
    return "<details><summary><span>" + esc(f[0]) + '</span><span class="tile">' + ic("chevron-down") + '</span></summary><div class="ans">' + esc(f[1]) + "</div></details>";
  }).join(""));
  $("#fq").addEventListener("toggle", function (e) {
    if (!e.target.open) return;
    $$("#fq details").forEach(function (d) { if (d !== e.target) d.open = false; });
  }, true);

  /* ---------- Contact ---------- */
  var C = S.contact, ch = [];
  if (safeUrl(C.whatsapp)) ch.push('<a class="btn" href="' + esc(C.whatsapp) + '" target="_blank" rel="noopener noreferrer">' + ic("message-circle") + " WhatsApp</a>");
  if (safeUrl(C.telegram)) ch.push('<a class="btn btn--paper" href="' + esc(C.telegram) + '" target="_blank" rel="noopener noreferrer">' + ic("send") + " Telegram</a>");
  if (C.email) ch.push('<a class="btn btn--ghost" href="mailto:' + esc(C.email) + '">' + ic("mail") + " " + esc(C.email) + "</a>");
  set("#ct", ch.join(""));
  $("#ctNote").textContent = ch.length ? "" : "Kanal kontak langsung belum tersedia, dan form kontak belum terhubung ke layanan pengiriman.";

  var status = $("#status");
  function say(msg, kind, copyText) {
    status.hidden = false; status.dataset.k = kind || "ok"; status.textContent = msg;
    if (copyText) {
      var b = document.createElement("button"); b.type = "button"; b.className = "btn btn--sm btn--paper"; b.innerHTML = ic("copy") + " Salin pesan";
      b.onclick = function () { (navigator.clipboard ? navigator.clipboard.writeText(copyText) : Promise.reject()).then(function () { b.lastChild.textContent = " Tersalin"; }, function () { b.lastChild.textContent = " Gagal menyalin"; }); };
      status.appendChild(document.createElement("br")); status.appendChild(b);
    }
  }
  $("#f").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = { n: $("#n").value.trim(), e: $("#e").value.trim(), m: $("#m").value.trim() };
    var er = {
      n: v.n.length >= 2 ? "" : "Isi nama Anda (minimal 2 karakter).",
      e: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.e) ? "" : "Masukkan alamat email yang valid, contoh: nama@email.com.",
      m: v.m.length >= 10 ? "" : "Tulis pesan minimal 10 karakter."
    };
    var first = null;
    ["n", "e", "m"].forEach(function (k) {
      $("#e-" + k).textContent = er[k]; $("#" + k).setAttribute("aria-invalid", er[k] ? "true" : "false");
      if (er[k] && !first) first = $("#" + k);
    });
    if (first) { say("Periksa kolom yang ditandai.", "err"); first.focus(); return; }
    var text = "Halo SANTANIC.ID, saya " + v.n + " (" + v.e + ").\n\n" + v.m;
    if (safeUrl(C.whatsapp)) { say("Membuka WhatsApp…"); window.open(C.whatsapp + (C.whatsapp.indexOf("?") > -1 ? "&" : "?") + "text=" + encodeURIComponent(text), "_blank", "noopener"); }
    else if (C.email) { say("Membuka aplikasi email…"); location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Diskusi project") + "&body=" + encodeURIComponent(text); }
    else if (safeUrl(C.telegram)) { say("Pesan belum terkirim. Salin pesan, lalu tempel di chat Telegram.", "ok", text); window.open(C.telegram, "_blank", "noopener"); }
    else say("Pesan belum terkirim: form ini belum terhubung ke layanan pengiriman. Anda bisa menyalin pesan ini dan mengirimkannya lewat kanal lain.", "err", text);
  });
  /* sembunyikan dock saat keyboard aktif agar tidak menutupi form */
  document.addEventListener("focusin", function (e) { if (e.target.matches("input,textarea")) document.documentElement.classList.add("typing"); });
  document.addEventListener("focusout", function () { setTimeout(function () { if (!document.activeElement || !document.activeElement.matches("input,textarea")) document.documentElement.classList.remove("typing"); }, 120); });

  /* ---------- Footer ---------- */
  set("#fl", NAV.map(function (n) { return '<a href="#' + n[0] + '" data-go="' + n[0] + '">' + n[1] + "</a>"; }).join(""));
  set("#ftm", S.team.map(function (m) { return '<a href="#team" data-go="team">' + esc(m.name) + "<br><small>" + esc(m.role) + "</small></a>"; }).join(""));

  /* ---------- Navbar desktop, dock, panel More ---------- */
  set("#barNav", BAR.map(function (id) { var n = navOf(id); return '<a href="#' + id + '" data-go="' + id + '" data-n="' + id + '">' + n[1] + "</a>"; }).join(""));
  set("#dock", DOCK.map(function (id) {
    var n = navOf(id); return '<button type="button" data-go="' + id + '" data-n="' + id + '" aria-label="' + n[1] + '">' + ic(n[2]) + "<span>" + n[1] + "</span></button>";
  }).join("") + '<button type="button" id="more" aria-haspopup="dialog" aria-expanded="false" aria-controls="sheet" aria-label="More — menu lainnya">' + ic("layout-grid") + "<span>More</span></button>");
  set("#mg", MORE.map(function (id) { var n = navOf(id); return '<a href="#' + id + '" data-go="' + id + '" data-n="' + id + '">' + ic(n[2]) + "<span>" + n[1] + "</span></a>"; }).join(""));

  var sheet = $("#sheet"), moreBtn = $("#more"), sheetOpener = null, sheetTimer;
  function openSheet(opener) {
    clearTimeout(sheetTimer); sheetOpener = opener || moreBtn;
    sheet.hidden = false; void sheet.offsetWidth; sheet.classList.add("open");
    moreBtn.setAttribute("aria-expanded", "true"); document.documentElement.classList.add("lock");
    $("#sheetX").focus({ preventScroll: true });
  }
  function closeSheet(restore) {
    if (sheet.hidden) return;
    sheet.classList.remove("open"); moreBtn.setAttribute("aria-expanded", "false"); document.documentElement.classList.remove("lock");
    sheetTimer = setTimeout(function () { sheet.hidden = true; }, reduce ? 0 : 300);
    if (restore !== false && sheetOpener && sheetOpener.focus) sheetOpener.focus({ preventScroll: true });
  }
  moreBtn.addEventListener("click", function () { sheet.classList.contains("open") ? closeSheet() : openSheet(moreBtn); });
  $("#barMenu").addEventListener("click", function () { openSheet($("#barMenu")); });
  $("#sheetX").addEventListener("click", function () { closeSheet(); });
  sheet.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeSheet(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet.classList.contains("open")) closeSheet();
    if (e.key === "Tab" && sheet.classList.contains("open")) { /* focus trap sederhana */
      var f = $$("button,a[href]", sheet.querySelector(".sheet__pn")); if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  /* ---------- scroll ke section ---------- */
  function go(id) {
    var el = document.getElementById(id); if (!el) return;
    closeSheet(false);
    if (id === "home") scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    try { history.replaceState(null, "", "#" + id); } catch (_) {}
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]"); if (!t) return;
    e.preventDefault();
    var id = t.dataset.go;
    if (sheet.classList.contains("open")) { closeSheet(false); setTimeout(function () { go(id); }, reduce ? 0 : 60); } else go(id);
  });

  /* ---------- scroll-spy ---------- */
  var current = "";
  function setActive(id) {
    if (id === current) return; current = id;
    $$("[data-n]").forEach(function (el) { el.removeAttribute("aria-current"); });
    $$('[data-n="' + id + '"]').forEach(function (el) { el.setAttribute("aria-current", "true"); });
    if (MORE.indexOf(id) > -1) moreBtn.setAttribute("aria-current", "true"); else moreBtn.removeAttribute("aria-current");
  }
  var ids = NAV.map(function (n) { return n[0]; });
  var secs = ids.map(function (id) { return document.getElementById(id); });
  var ticking = false;
  function spy() {
    ticking = false;
    var y = scrollY + innerHeight * 0.38, found = "home";
    for (var i = 0; i < secs.length; i++) if (secs[i] && secs[i].offsetTop <= y) found = ids[i];
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 6) found = "contact";
    setActive(found);
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  addEventListener("resize", spy);

  renderProjects(); renderShowcase(); spy();
  if (location.hash && document.getElementById(location.hash.slice(1))) setTimeout(function () { go(location.hash.slice(1)); }, 80);
})();
