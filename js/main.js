(function () {
  const C = window.CHALET || {};

  // ---------- English translations (Greek is the default in the HTML) ----------
  const EN = {
    "nav.about": "The house", "nav.gallery": "Photos", "nav.seasons": "Seasons",
    "nav.area": "The area", "nav.contact": "Contact", "nav.book": "Book",
    "cta.book": "Book", "cta.contact": "Contact", "cta.checkAvailability": "Check availability",
    "cta.more": "The experience", "cta.book.airbnb": "Book on Airbnb",
    "cta.call": "Call", "cta.email": "Email",
    "hero.eyebrow": "Ipati · Mount Oiti",
    "hero.title": "Wake up in the forest",
    "hero.lead": "A wooden chalet on an 11-stremma (2.7-acre) estate, with views across the whole valley. Here, time moves differently.",
    "hero.rating": "5.0 on Airbnb",
    "stat.guests": "guests", "stat.bedrooms": "bedrooms", "stat.beds": "beds",
    "stat.baths": "bathrooms", "stat.landnum": "11", "stat.land": "stremmata (2.7 acres)",
    "nav.experience": "The experience",
    "xp.eyebrow": "The experience", "xp.title": "A day at Ipati Forest Chalet",
    "xp.lead": "It's not just a house to stay in. It's a way to spend your day, from the first coffee to the last spark in the fireplace.",
    "x1.t": "Breakfast above the valley", "x1.d": "The first coffee on the balcony. Mist slowly lifts from the Spercheios valley and all you hear are the birds in the chestnut trees. Mornings here are never in a hurry.",
    "x2.t": "Days in the mountains", "x2.d": "Step out of the door and onto the trail. Within minutes you're in the fir forests of Mount Oiti, beside waterfalls, or climbing up to the mountain refuge. In the afternoon, a warm soak at the Ipati thermal springs.",
    "x3.t": "The garden is yours", "x3.d": "Eleven stremmata (2.7 acres) of vines, walnut trees, a vegetable garden and chestnuts. A hammock under the trees, sunbeds with a view, ping pong and bicycles for young and old.",
    "x4.t": "Dinner under the pergola", "x4.d": "Light the barbecue, set the table in the garden and stay out until the stars come out. The outdoor kitchen with its oven is ready for you.",
    "x5.t": "Evenings by the fire", "x5.d": "When the temperature drops, the fire is lit. A glass of wine, a board game, a few notes on the piano. Outside, only the forest.",
    "x6.t": "Winter in the snow", "x6.d": "When it snows, the estate turns white and the forest falls silent. Walk among snow-covered firs, ski at Parnassos or Karpenisi, and come back to a warm house with the fire already lit. To end the day, a hot soak at the Ipati thermal springs.",
    "x7.t": "Autumn with chestnuts and walnuts", "x7.d": "The forest turns red and gold and the mist wraps around the firs. Gather chestnuts and walnuts from the trees on the estate, roast them in the fireplace and enjoy them with a warm cup of mountain tea.",
    "x8.t": "Spring among the blossoms", "x8.d": "The apple and cherry trees on the estate burst into white blossom and the meadows fill with wildflowers. The air smells of spring, the waterfalls run with melted snow and the valley spreads out green below the balcony.",
    "x9.t": "Summer in the cool mountain air", "x9.d": "When the city swelters, the cool breeze of Mount Oiti blows here. Sunbeds in the shade of the trees, an outdoor shower in the garden, fruit from the trees and evenings outside under the stars. And if you miss the sea, take the house's beach gear for a day on the beaches of the Malian Gulf.",
    "nav.availability": "Availability",
    "cal.eyebrow": "Availability", "cal.title": "When the chalet is free",
    "cal.lead": "See which days are available for your stay.",
    "cal.free": "Available", "cal.taken": "Not available",
    "contact.alsoAirbnb": "You can also find us on Airbnb, rated 5.0 ★", "contact.viewAirbnb": "View the listing",
    "about.eyebrow": "The house", "about.title": "Wood, stone and lots of light",
    "about.p1": "The ground floor has the dining area and the living room with the fireplace, the kitchen, a bathroom and a bedroom. A French door in the kitchen opens onto a balcony overlooking the garden and the forest.",
    "about.p2": "A staircase leads upstairs to a second living room, a bathroom, two bedrooms and a wonderful view from the balcony.",
    "about.p3": "The house sits on an 11-stremma estate (2.7 acres / 1.1 hectares) with vines, walnut trees, vegetable garden and chestnut trees, all freely accessible to guests.",
    "feat.title": "What you'll find",
    "feat.fireplace": "Fireplace in the living room", "feat.garden": "Garden with vines, walnut & chestnut trees",
    "feat.bbq": "BBQ & outdoor kitchen", "feat.dining": "Outdoor dining",
    "feat.hammock": "Hammock & sunbeds", "feat.pingpong": "Ping pong & bicycles",
    "feat.kids": "Children's playroom", "feat.piano": "Piano, books & board games",
    "feat.kitchen": "Full kitchen with dishwasher", "feat.wifi": "Wi‑Fi & workspace",
    "feat.ac": "Air conditioning & heating", "feat.parking": "Free parking on the property",
    "feat.more": "Also: washer & dryer, cot on request, outdoor shower, private entrance.",
    "gallery.eyebrow": "Photos", "gallery.title": "A look inside and out",
    "seasons.eyebrow": "All year round", "seasons.title": "A house for every season",
    "s.spring": "Spring", "s.spring.d": "Apple and cherry trees in blossom",
    "s.summer": "Summer", "s.summer.d": "Meals in the garden, cool mountain air",
    "s.autumn": "Autumn", "s.autumn.d": "Chestnuts, walnuts and mist in the forest",
    "s.winter": "Winter", "s.winter.d": "Snow outside, fire inside",
    "area.eyebrow": "The area", "area.title": "Things to do around Ipati",
    "area.c1.t": "Ipati Thermal Springs", "area.c1.d": "Warm healing waters a few kilometres from the village. Perfect in winter.",
    "area.c2.t": "Oiti National Park", "area.c2.d": "Fir forests, waterfalls, alpine meadows and marked trails for every level of hiker.",
    "area.c3.t": "Agathonos Monastery & Gorgopotamos", "area.c3.d": "The historic monastery 4 km away and the legendary Gorgopotamos bridge 8 km away.",
    "area.c4.t": "Day trips", "area.c4.d": "Thermopylae, Karpenisi, Delphi, Arachova, the Parnassos ski centre and Meteora.",
    "nav.activities": "Hiking",
    "act.eyebrow": "Hiking & events", "act.title": "The trails start at your door",
    "act.lead": "Ipati is the gateway to Mount Oiti. Many waymarked mountain trails start right from the village and lead into the National Park, from easy walks to serious climbs.",
    "act.trails": "🥾 Trails from Ipati",
    "t1.t": "Kremastos Waterfall (Farmakidis Path)", "t1.d": "Loop of about 2.4 km, around 2 hours. Great for families.",
    "t2.t": "Ipati – Castle – Ipati", "t2.d": "Loop up to the Byzantine castle, with views over the whole Spercheios valley.",
    "t3.t": "Ipati – Perivolia – Arsalis chapel", "t3.d": "A forest walk above the village.",
    "t4.t": "Ipati – Amaliovrysi – Perdikovrysi – Oiti Refuge", "t4.d": "A climb of about 8 km through fir forest up to the Oiti mountain refuge.",
    "act.trailsmore": "Trail maps and details on oiti.gr →",
    "act.events": "🏃 Races & events",
    "e1.t": "Oiti Mountain Marathon “Hercules”", "e1.d": "A mountain marathon of about 42 km, starting and finishing in Ipati, inside Oiti National Park. Usually held in September by the Fthiotida runners' club “Trachina”.",
    "e2.t": "Oiti Ultra Trail", "e2.d": "An ultra race of about 100 km across the peaks of Oiti, based in Ipati. Usually held in September.",
    "e3.t": "Cultural events", "e3.d": "Ipati's cultural association “Ainianes” and the Municipality of Lamia organise events through the year, such as historical walks and the remembrance events every June.",
    "act.note": "Dates change every year. Ask Gogo what's on during your stay.",
    "loc.eyebrow": "Location", "loc.title": "Distances from the house",
    "d.agathonos": "Agathonos Monastery", "d.gorgopotamos": "Gorgopotamos Bridge",
    "d.thermopyles": "Thermopylae", "d.karpenisi": "Karpenisi", "d.parnassos": "Parnassos ski centre",
    "d.delphi": "Delphi / Arachova", "d.volos": "Nea Anchialos Airport (Volos)", "d.meteora": "Meteora",
    "d.athens": "Athens Airport", "d.thess": "Thessaloniki Airport",
    "loc.note": "Approximate road distances.",
    "loc.address": "Ipati, Fthiotida 350 16, Greece", "loc.directions": "Get directions",
    "contact.title": "Ready for a getaway?",
    "contact.lead": "For any question, message Georgia (Gogo) on WhatsApp or give her a call.",
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
  if (C.phone) {
    phone.href = "tel:" + C.phone.replace(/\s/g, "");
    phone.querySelector(".phone-num").textContent = C.phone;
  } else phone.remove();
  document.querySelectorAll(".contact-whatsapp").forEach((a) => {
    if (!C.whatsapp) return a.remove();
    const msg = "Γεια σας! Ενδιαφέρομαι για το Ipati Forest Chalet.";
    a.href = "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  });
  const email = document.querySelector(".contact-email");
  if (C.email) email.href = "mailto:" + C.email; else email.remove();
  document.querySelectorAll(".instagram-link").forEach((a) => {
    if (C.instagram) a.href = C.instagram; else a.remove();
  });

  // ---------- Gallery + lightbox ----------
  const photos = C.photos || [];
  const grid = document.getElementById("galleryGrid");
  const cap = (p) => (lang === "en" ? p.en : p.el) || "";
  const thumb = (p) => p.src.replace("images/gallery/", "images/gallery/thumbs/");
  const FIRST = 16;
  let expanded = false;
  const moreBtn = document.getElementById("galleryMore");
  if (moreBtn) moreBtn.addEventListener("click", () => {
    expanded = !expanded; renderGallery();
    if (!expanded) document.getElementById("gallery").scrollIntoView();
  });
  function renderGallery() {
    grid.innerHTML = "";
    if (moreBtn) {
      moreBtn.hidden = photos.length <= FIRST;
      moreBtn.textContent = expanded
        ? (lang === "en" ? "Show fewer photos" : "Λιγότερες φωτογραφίες")
        : (lang === "en" ? `Show all ${photos.length} photos` : `Δείτε όλες τις φωτογραφίες (${photos.length})`);
    }
    photos.forEach((p, i) => {
      if (!expanded && i >= FIRST) return;
      const b = document.createElement("button");
      b.type = "button"; b.className = "ph";
      const img = document.createElement("img");
      img.src = thumb(p); img.alt = cap(p) || "Ipati Forest Chalet"; img.loading = "lazy";
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
    lbCap.textContent = (cap(photos[cur]) ? cap(photos[cur]) + " · " : "") + `${cur + 1}/${photos.length}`;
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

  // ---------- Reveal on scroll + hero parallax ----------
  document.documentElement.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 })
    : null;
  function watch(root) {
    const sel = ".xp-img, .xp-text, .xp-intro, .seasons figure, .card, .act-list li, .features li, .about-img, .ph, .map, .address, .stats, .section h2";
    root.querySelectorAll(sel).forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (el.matches(".ph, .seasons figure, .card, .features li, .act-list li")) el.style.setProperty("--d", (i % 4) * 0.08 + "s");
      if (io) io.observe(el); else el.classList.add("in");
    });
  }
  watch(document);
  // Safety net: after fast scrolls or jumps, reveal anything already above the bottom of the screen.
  let sweep = null;
  window.addEventListener("scroll", () => {
    clearTimeout(sweep);
    sweep = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("in"); if (io) io.unobserve(el); }
      });
    }, 120);
  }, { passive: true });
  new MutationObserver(() => watch(grid)).observe(grid, { childList: true });

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && !reduce) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        heroBg.style.translate = `0 ${y * 0.25}px`;
        ticking = false;
      });
    }, { passive: true });
  }
})();
