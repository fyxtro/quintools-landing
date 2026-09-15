/* ============================================================
   QUINTOOLS — RENDER LOGIC
   Reads PROJECTS + CATEGORIES from projects.js and builds the
   cards, filter chips, search and stats. You normally never
   need to edit this file — just projects.js.
   ============================================================ */

const DEFAULT_ACCENT = "linear-gradient(120deg, #7c5cff, #22d3ee)";
const STATUS_LABEL = { live: "Live", wip: "In progress", planned: "Planned" };

let activeFilter = "All";
let searchQuery = "";

/* ---- helpers ---- */
function catMeta(name) {
  return (typeof CATEGORIES !== "undefined" && CATEGORIES[name]) || null;
}
function accentFor(project) {
  const meta = catMeta(project.category);
  return meta ? meta.color : null;
}
function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

/* ---- external link icon ---- */
const ICON_EXTERNAL =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
const ICON_GITHUB =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z"/></svg>';

/* ---- card template ---- */
function cardHTML(p, i = 0) {
  const status = p.status || "live";
  const accent = accentFor(p);
  const delay = `animation-delay:${i * 0.05}s`;
  const accentStyle = [delay, accent ? `--card-accent:${accent}` : ""]
    .filter(Boolean)
    .join("; ");
  const iconStyle = accent ? `border-color:${accent}55` : "";

  const tags = (p.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  const openBtn = p.url
    ? `<a class="card-btn primary" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">Open ${ICON_EXTERNAL}</a>`
    : `<span class="card-btn primary disabled">Coming soon</span>`;

  const repoBtn = p.repo
    ? `<a class="icon-btn" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener" title="Source code" aria-label="Source code">${ICON_GITHUB}</a>`
    : "";

  return `
    <article class="card ${p.featured ? "featured" : ""}" style="${accentStyle}">
      <div class="card-top">
        <div class="card-icon" style="${iconStyle}">${p.icon || "🧰"}</div>
        <span class="badge ${status}"><span class="bdot"></span>${STATUS_LABEL[status] || status}</span>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="desc">${escapeHtml(p.description)}</p>
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      <div class="card-actions">
        ${openBtn}
        ${repoBtn}
      </div>
    </article>`;
}

/* ---- filter chips ---- */
function renderFilters() {
  const cats = [...new Set(PROJECTS.map((p) => p.category))];
  const all = ["All", ...cats];
  const el = document.getElementById("filters");
  el.innerHTML = all
    .map((c) => {
      const meta = catMeta(c);
      const dot = meta
        ? `<span class="cdot" style="background:${meta.color}"></span>`
        : "";
      return `<button class="chip ${c === activeFilter ? "active" : ""}" data-cat="${escapeHtml(c)}">${dot}${escapeHtml(c)}</button>`;
    })
    .join("");

  el.querySelectorAll(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.cat;
      renderFilters();
      renderCards();
    })
  );
}

/* ---- cards ---- */
function renderCards() {
  const q = searchQuery.trim().toLowerCase();
  const list = PROJECTS.filter((p) => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const haystack = [p.title, p.description, p.category, ...(p.tags || [])]
      .join(" ")
      .toLowerCase();
    const matchSearch = !q || haystack.includes(q);
    return matchCat && matchSearch;
  });

  const grid = document.getElementById("grid");
  if (!list.length) {
    grid.innerHTML = `<div class="empty">No tools match your search yet. Try another category.</div>`;
    return;
  }
  grid.innerHTML = list.map((p, i) => cardHTML(p, i)).join("");
}

/* ---- stats ---- */
function renderStats() {
  const total = PROJECTS.length;
  const live = PROJECTS.filter((p) => (p.status || "live") === "live").length;
  const cats = new Set(PROJECTS.map((p) => p.category)).size;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("stat-total", total);
  set("stat-live", live);
  set("stat-cats", cats);
}

/* ---- init ---- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = "2026";
  renderStats();
  renderFilters();
  renderCards();

  const search = document.getElementById("search-input");
  search.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCards();
  });
});
