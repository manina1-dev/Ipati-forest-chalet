// Availability calendar (display only), filled from data/availability.json
// (updated automatically from Airbnb by .github/workflows/airbnb-calendar.yml).
(function () {
  const root = document.getElementById("calendar");
  if (!root) return;

  const T = {
    el: { prev: "Προηγούμενος μήνας", next: "Επόμενος μήνας", free: "διαθέσιμο", taken: "μη διαθέσιμο" },
    en: { prev: "Previous month", next: "Next month", free: "available", taken: "not available" },
  };
  const lang = () => (document.documentElement.lang === "en" ? "en" : "el");
  const t = () => T[lang()];

  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  let booked = new Set();   // nights that are taken (ISO dates)
  let updated = null;
  let offset = 0;           // months from the current month
  const MAX_OFFSET = 11;

  function months() { return window.matchMedia("(max-width: 760px)").matches ? 1 : 2; }

  function render() {
    const L = t();
    const loc = lang() === "en" ? "en-GB" : "el-GR";
    const fmtMonth = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric" });
    const fmtDay = new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long" });
    const wd = new Intl.DateTimeFormat(loc, { weekday: "narrow" });
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
        const past = day < today;
        const taken = booked.has(iso(day));
        const cls = ["cal-day"];
        if (past) cls.push("past");
        else if (taken) cls.push("taken");
        const state = past ? "" : taken ? ` – ${L.taken}` : ` – ${L.free}`;
        html += `<span class="${cls.join(" ")}" aria-label="${fmtDay.format(day)}${state}">${d}</span>`;
      }
      html += `</div></div>`;
    }
    root.innerHTML = html + `</div>`;
  }

  root.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) { offset = Math.max(0, Math.min(MAX_OFFSET, offset + Number(nav.dataset.nav))); render(); }
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
