(function () {
  const C = window.CHALET || {};

  // ---------- English translations (Greek is the default in the HTML) ----------
  const EN = {
    "nav.about": "The chalet", "nav.gallery": "Photos", "nav.area": "The area",
    "nav.location": "Location", "nav.contact": "Contact",
    "cta.book": "Book", "cta.checkAvailability": "Check availability on Airbnb",
    "cta.more": "Learn more", "cta.book.airbnb": "Book on Airbnb",
    "cta.call": "Call", "cta.email": "Email",
    "hero.eyebrow": "Ypati · Mount Oiti",
    "hero.title": "A chalet in the forest",
    "hero.lead": "Wake up to mountain views, walk the trails of Mount Oiti and unwind in the thermal springs — just minutes from your door.",
    "about.eyebrow": "The chalet", "about.title": "Quiet, wood and stone",
    "about.p1": "Ipati Forest Chalet is a welcoming home surrounded by greenery, ideal for couples, families and friends who want to escape the city.",
    "about.p2": "Gogo, your host, will make sure you have everything you need and will point you to the best spots in the area.",
    "feat.view": "Mountain and forest views", "feat.springs": "Close to Ypati thermal springs",
    "feat.hiking": "Mount Oiti hiking trails", "feat.parking": "Parking",
    "feat.wifi": "Wi‑Fi", "feat.kitchen": "Fully equipped kitchen",
    "gallery.eyebrow": "Photos", "gallery.title": "A look inside and out",
    "area.eyebrow": "The area", "area.title": "Things to do around Ypati",
    "area.c1.t": "Ypati Thermal Springs", "area.c1.d": "Warm healing waters a few kilometres from the village — perfect in winter.",
    "area.c2.t": "Oiti National Park", "area.c2.d": "Fir forests, alpine meadows and marked trails for every level of hiker.",
    "area.c3.t": "Castle & old Ypati", "area.c3.d": "Stroll the cobbled lanes, the Byzantine castle and the plane-tree squares.",
    "area.c4.t": "Local food", "area.c4.d": "Tavernas with grilled meat, cheeses and wine from Fthiotida, close by.",
    "loc.eyebrow": "Location", "loc.title": "Getting here",
    "loc.lamia": "Lamia", "loc.lamia.d": "~25 min", "loc.springs": "Ypati Springs", "loc.springs.d": "~10 min",
    "loc.athens": "Athens", "loc.athens.d": "~2.5 h", "loc.thess": "Thessaloniki", "loc.thess.d": "~3 h",
    "loc.note": "The exact address is shared after booking.",
    "contact.title": "Ready for a getaway?",
    "contact.lead": "See available dates and book securely through Airbnb, or contact Gogo directly.",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const EL = {};
  nodes.forEach((n) => { EL[n.dataset.i18n] = n.textContent; });

  function setLang(lang) {
    const dict = lang === "en" ? EN : EL;
    nodes.forEach((n) => { const v = dict[n.dataset.i18n]; if (v) n.textContent = v; });
    document.documentElement.lang = lang;
    document.getElementById("langToggle").textContent = lang === "en" ? "ΕΛ" : "EN";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  let lang = "el";
  try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("el") ? "el" : "en"); } catch (e) {}
  if (lang === "en") setLang("en");
  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "el" : "en"; setLang(lang);
  });

  // ---------- Links from config ----------
  document.querySelectorAll(".airbnb-link").forEach((a) => { a.href = C.airbnbUrl || "#"; });
  const phone = document.querySelector(".contact-phone");
  if (C.phone) phone.href = "tel:" + C.phone.replace(/\s/g, ""); else phone.remove();
  const email = document.querySelector(".contact-email");
  if (C.email) email.href = "mailto:" + C.email; else email.remove();
  const ig = document.querySelector(".instagram-link");
  if (C.instagram) ig.href = C.instagram; else ig.parentElement.remove();

  // ---------- Hero ----------
  if (C.heroPhoto) document.querySelector(".hero-bg").style.backgroundImage = `url("${C.heroPhoto}")`;

  // ---------- Gallery ----------
  const grid = document.getElementById("galleryGrid");
  const photos = C.photos && C.photos.length ? C.photos : null;
  if (photos) {
    photos.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "ph";
      const img = document.createElement("img");
      img.src = p.src; img.alt = p.alt || ""; img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", () => openLb(p));
      grid.appendChild(b);
    });
  } else {
    for (let i = 0; i < 6; i++) {
      const d = document.createElement("div");
      d.className = "ph ph-empty";
      d.textContent = "📷";
      grid.appendChild(d);
    }
  }

  const lb = document.getElementById("lightbox");
  function openLb(p) { lb.querySelector("img").src = p.src; lb.querySelector("img").alt = p.alt || ""; lb.hidden = false; }
  lb.addEventListener("click", (e) => { if (e.target !== lb.querySelector("img")) lb.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
