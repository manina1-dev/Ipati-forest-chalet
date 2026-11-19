(function () {
  const C = window.CHALET || {};

  // ---------- English translations (Greek is the default in the HTML) ----------
  const EN = {
    "nav.about": "The chalet", "nav.gallery": "Photos", "nav.seasons": "Seasons",
    "nav.area": "The area", "nav.contact": "Book",
    "cta.book": "Book", "cta.checkAvailability": "Check availability on Airbnb",
    "cta.more": "Learn more", "cta.book.airbnb": "Book on Airbnb",
    "cta.call": "Call", "cta.email": "Email",
    "hero.eyebrow": "Ypati · Central Greece",
    "hero.title": "A chalet in the forest",
    "hero.lead": "A wooden house on an eleven-stremma estate, with a fireplace, a garden and views across the whole valley, at the foot of Mount Oiti.",
    "hero.rating": "5.0 on Airbnb",
    "stat.guests": "guests", "stat.bedrooms": "bedrooms", "stat.beds": "beds",
    "stat.baths": "bathrooms", "stat.land": "stremmata of land",
    "about.eyebrow": "The chalet", "about.title": "Wood, fire and forest views",
    "about.p1": "The ground floor has the dining area and the living room with the fireplace, the kitchen, a bathroom and a bedroom. A French door in the kitchen opens onto a balcony overlooking the garden and the forest.",
    "about.p2": "A staircase leads upstairs to a second living room, a bathroom, two bedrooms and a wonderful view from the balcony.",
    "about.p3": "The house sits on an eleven-stremma (approx. 2.7-acre) estate with a vineyard, walnut grove, vegetable garden and chestnut trees, all freely accessible to guests.",
    "feat.title": "What you'll find",
    "feat.fireplace": "Fireplace in the living room", "feat.garden": "Garden with vines, walnut & chestnut trees",
    "feat.bbq": "BBQ & outdoor kitchen", "feat.dining": "Outdoor dining",
    "feat.hammock": "Hammock & sunbeds", "feat.pingpong": "Ping pong & bicycles",
    "feat.kids": "Children's playroom", "feat.piano": "Piano, books & board games",
    "feat.kitchen": "Full kitchen with dishwasher", "feat.wifi": "Wi‑Fi & workspace",
    "feat.ac": "Air conditioning & heating", "feat.parking": "Free parking on the property",
    "feat.more": "Also: washer & dryer, cot on request, outdoor shower, private entrance.",
    "gallery.eyebrow": "Photos", "gallery.title": "A look inside and out",
    "gallery.more": "See all photos on Airbnb →",
    "seasons.eyebrow": "All year round", "seasons.title": "A house for every season",
    "s.spring": "Spring", "s.spring.d": "Apple and cherry trees in blossom",
    "s.summer": "Summer", "s.summer.d": "Meals in the garden, cool mountain air",
    "s.autumn": "Autumn", "s.autumn.d": "Chestnuts, walnuts and mist in the forest",
    "s.winter": "Winter", "s.winter.d": "Snow outside, fire inside",
    "area.eyebrow": "The area", "area.title": "Things to do around Ypati",
    "area.c1.t": "Ypati Thermal Springs", "area.c1.d": "Warm healing waters a few kilometres from the village. Perfect in winter.",
    "area.c2.t": "Oiti National Park", "area.c2.d": "Fir forests, waterfalls, alpine meadows and marked trails for every level of hiker.",
    "area.c3.t": "Agathonos Monastery & Gorgopotamos", "area.c3.d": "The historic monastery 4 km away and the legendary Gorgopotamos bridge 8 km away.",
    "area.c4.t": "Day trips", "area.c4.d": "Thermopylae, Karpenisi, Delphi, Arachova, the Parnassos ski centre and Meteora.",
    "loc.eyebrow": "Location", "loc.title": "Distances from the house",
    "d.agathonos": "Agathonos Monastery", "d.gorgopotamos": "Gorgopotamos Bridge",
    "d.thermopyles": "Thermopylae", "d.karpenisi": "Karpenisi", "d.parnassos": "Parnassos ski centre",
    "d.delphi": "Delphi / Arachova", "d.volos": "Nea Anchialos Airport (Volos)", "d.meteora": "Meteora",
    "d.athens": "Athens Airport", "d.thess": "Thessaloniki Airport",
    "loc.note": "The exact location is shared after booking.",
    "contact.title": "Ready for a getaway?",
    "contact.lead": "See available dates and book securely through Airbnb. Georgia (Gogo) will be happy to welcome you.",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const EL = {};
  nodes.forEach((n) => { EL[n.dataset.i18n] = n.textContent; });

  let lang = "el";
  function setLang(l) {
    lang = l;
    const dict = l === "en" ? EN : EL;
    nodes.forEach((n) => { const v = dict[n.dataset.i18n]; if (v) n.textContent = v; });
    document.documentElement.lang = l;
    document.getElementById("langToggle").textContent = l === "en" ? "ΕΛ" : "EN";
    document.querySelectorAll(".distances b").forEach((b) => {
      b.textContent = l === "en" ? b.textContent.replace("χλμ.", "km") : b.textContent.replace("km", "χλμ.");
    });
    renderGallery();
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  document.getElementById("langToggle").addEventListener("click", () => setLang(lang === "en" ? "el" : "en"));

  // ---------- Links from config ----------
  document.querySelectorAll(".airbnb-link").forEach((a) => { a.href = C.airbnbUrl || "#"; });
  const phone = document.querySelector(".contact-phone");
  if (C.phone) phone.href = "tel:" + C.phone.replace(/\s/g, ""); else phone.remove();
  const email = document.querySelector(".contact-email");
  if (C.email) email.href = "mailto:" + C.email; else email.remove();
  const ig = document.querySelector(".instagram-link");
  if (C.instagram) ig.href = C.instagram; else ig.parentElement.remove();

  // ---------- Gallery + lightbox ----------
  const photos = C.photos || [];
  const grid = document.getElementById("galleryGrid");
  const cap = (p) => (lang === "en" ? p.en : p.el) || "";
  function renderGallery() {
    grid.innerHTML = "";
    photos.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "ph";
      const img = document.createElement("img");
      img.src = p.src; img.alt = cap(p); img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", () => openLb(i));
      grid.appendChild(b);
    });
  }

  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
  let cur = 0;
  function show(i) {
    cur = (i + photos.length) % photos.length;
    lbImg.src = photos[cur].src; lbImg.alt = cap(photos[cur]);
    lbCap.textContent = `${cap(photos[cur])} · ${cur + 1}/${photos.length}`;
  }
  function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); show(cur - 1); });
  lb.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); show(cur + 1); });
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    tx = null;
  });

  // ---------- Initial language ----------
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  const initial = saved || ((navigator.language || "el").toLowerCase().startsWith("el") ? "el" : "en");
  if (initial === "en") setLang("en"); else renderGallery();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
