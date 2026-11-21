// Availability calendar, filled from data/availability.json
// (updated automatically from Airbnb by .github/workflows/airbnb-calendar.yml).
(function () {
  const root = document.getElementById("calendar");
  if (!root) return;
  const C = window.CHALET || {};

  const T = {
    el: {
      prev: "Προηγούμενος μήνας", next: "Επόμενος μήνας",
      pickIn: "Διαλέξτε ημερομηνία άφιξης.",
      pickOut: "Τώρα διαλέξτε ημερομηνία αναχώρησης.",
      nights: (n) => (n === 1 ? "1 νύχτα" : n + " νύχτες"),
      book: "Κράτηση αυτών των ημερομηνιών στο Airbnb",
      clear: "Καθαρισμός",
      blocked: "Αυτές οι ημερομηνίες περιλαμβάνουν μέρες που είναι ήδη κλεισμένες. Διαλέξτε άλλη ημερομηνία αναχώρησης.",
      updated: "Ενημερώθηκε από το Airbnb",
      notyet: "Το ημερολόγιο συνδέεται με το Airbnb. Η τελική διαθεσιμότητα επιβεβαιώνεται πάντα στο Airbnb.",
    },
    en: {
      prev: "Previous month", next: "Next month",
      pickIn: "Choose your check-in date.",
      pickOut: "Now choose your check-out date.",
      nights: (n) => (n === 1 ? "1 night" : n + " nights"),
      book: "Book these dates on Airbnb",
      clear: "Clear",
      blocked: "These dates include days that are already booked. Please choose another check-out date.",
      updated: "Updated from Airbnb",
      notyet: "The calendar is being connected to Airbnb. Final availability is always confirmed on Airbnb.",
    },
  };
  const lang = () => (document.documentElement.lang === "en" ? "en" : "el");
  const t = () => T[lang()];

  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  let booked = new Set();   // nights that are taken (ISO dates)
  let updated = null;
  let checkIn = null, checkOut = null, msg = "";
  let offset = 0;           // months from the current month
  const MAX_OFFSET = 11;

  function months() { return window.matchMedia("(max-width: 760px)").matches ? 1 : 2; }

  function render() {
    const L = t();
    const fmtMonth = new Intl.DateTimeFormat(lang() === "en" ? "en-GB" : "el-GR", { month: "long", year: "numeric" });
    const fmtDay = new Intl.DateTimeFormat(lang() === "en" ? "en-GB" : "el-GR", { weekday: "short", day: "numeric", month: "short" });
    const wd = new Intl.DateTimeFormat(lang() === "en" ? "en-GB" : "el-GR", { weekday: "narrow" });
    const n = months();
    let html = `<div class="cal-head">
      <button type="button" class="cal-nav" data-nav="-1" aria-label="${L.prev}" ${offset <= 0 ? "disabled" : ""}>‹</button>
      <button type="button" class="cal-nav" data-nav="1" aria-label="${L.next}" ${offset + n - 1 >= MAX_OFFSET ? "disabled" : ""}>›</button>
    </div><div class="cal-months">`;
    for (let m = 0; m < n; m++) {
      const first = new Date(today.getFullYear(), today.getMonth() + offset + m, 1);
      const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const lead = (first.getDay() + 6) % 7; // Monday first
      html += `<div class="cal-month"><h4>${fmtMonth.format(first)}</h4><div class="cal-grid">`;
      for (let i = 0; i < 7; i++) html += `<span class="cal-wd">${wd.format(new Date(2024, 0, 1 + i))}</span>`;
      for (let i = 0; i < lead; i++) html += `<span></span>`;
      for (let d = 1; d <= days; d++) {
        const day = new Date(first.getFullYear(), first.getMonth(), d);
        const k = iso(day);
        const past = day < today;
        const taken = booked.has(k);
        const cls = ["cal-day"];
        if (past) cls.push("past");
        if (taken) cls.push("taken");
        if (checkIn && k === iso(checkIn)) cls.push("sel", "sel-start");
        if (checkOut && k === iso(checkOut)) cls.push("sel", "sel-end");
        if (checkIn && checkOut && day > checkIn && day < checkOut) cls.push("in-range");
        // A taken night can still be a check-out day (guests leave in the morning).
        const canCheckout = checkIn && !checkOut && day > checkIn;
        const disabled = past || (taken && !canCheckout);
        html += `<button type="button" class="${cls.join(" ")}" data-day="${k}" ${disabled ? "disabled" : ""} aria-label="${fmtDay.format(day)}">${d}</button>`;
      }
      html += `</div></div>`;
    }
    html += `</div>`;

    let summary;
    if (checkIn && checkOut) {
      const nights = Math.round((checkOut - checkIn) / 864e5);
      const url = new URL(C.airbnbUrl || "https://www.airbnb.gr");
      url.searchParams.set("check_in", iso(checkIn));
      url.searchParams.set("check_out", iso(checkOut));
      summary = `<p class="cal-pick"><b>${fmtDay.format(checkIn)} → ${fmtDay.format(checkOut)}</b> · ${L.nights(nights)}</p>
        <div class="cal-actions"><a class="btn" href="${url}" target="_blank" rel="noopener">${L.book}</a>
        <button type="button" class="btn btn-ghost-green" data-clear>${L.clear}</button></div>`;
    } else {
      summary = `<p class="cal-pick">${msg || (checkIn ? L.pickOut : L.pickIn)}</p>` +
        (checkIn ? `<div class="cal-actions"><button type="button" class="btn btn-ghost-green" data-clear>${L.clear}</button></div>` : "");
    }
    const fmtUpd = new Intl.DateTimeFormat(lang() === "en" ? "en-GB" : "el-GR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    const note = updated ? `${L.updated}: ${fmtUpd.format(updated)}` : L.notyet;
    root.innerHTML = html + `<div class="cal-foot">${summary}<p class="cal-note">${note}</p></div>`;
  }

  root.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) { offset = Math.max(0, Math.min(MAX_OFFSET, offset + Number(nav.dataset.nav))); render(); return; }
    if (e.target.closest("[data-clear]")) { checkIn = checkOut = null; msg = ""; render(); return; }
    const b = e.target.closest("[data-day]");
    if (!b || b.disabled) return;
    const day = parse(b.dataset.day);
    msg = "";
    if (!checkIn || checkOut || day <= checkIn) {
      if (booked.has(iso(day))) return;
      checkIn = day; checkOut = null;
    } else {
      for (let d = checkIn; d < day; d = addDays(d, 1)) {
        if (booked.has(iso(d))) { msg = t().blocked; render(); return; }
      }
      checkOut = day;
    }
    render();
  });

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  window.matchMedia("(max-width: 760px)").addEventListener("change", render);

  // Until the first sync from Airbnb has run, keep the section hidden so it never shows false availability.
  const section = document.getElementById("availability");
  const navLink = document.querySelector('a[href="#availability"]');
  const show = (on) => { if (section) section.hidden = !on; if (navLink) navLink.hidden = !on; };
  show(false);
  render();
  fetch("data/availability.json?t=" + Date.now())
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data) return;
      updated = data.updated ? new Date(data.updated) : null;
      if (!updated) return;
      show(true);
      booked = new Set();
      (data.booked || []).forEach(({ start, end }) => {
        for (let d = parse(start); d < parse(end); d = addDays(d, 1)) booked.add(iso(d));
      });
      render();
    })
    .catch(() => {});
})();
