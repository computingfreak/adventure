const state = {
  query: "",
  sort: "relevance",
  activity: "all",
  region: "all",
  season: "all",
  selectedCompare: new Set(),
};

const gridEl = document.getElementById("destinationGrid");
const resultCountEl = document.getElementById("resultCount");
const activityFilterEl = document.getElementById("activityFilter");
const regionFilterEl = document.getElementById("regionFilter");
const detailDialog = document.getElementById("destinationDialog");
const detailEl = document.getElementById("destinationDetail");
const compareDialog = document.getElementById("compareDialog");
const compareContent = document.getElementById("compareContent");

const activities = [...new Set(DESTINATIONS.flatMap((d) => d.activities))].sort();
activities.forEach((a) => activityFilterEl.insertAdjacentHTML("beforeend", `<option value="${a}">${a}</option>`));
const regions = [...new Set(DESTINATIONS.map((d) => d.region))].sort();
regions.forEach((r) => regionFilterEl.insertAdjacentHTML("beforeend", `<option value="${r}">${r}</option>`));

function relevanceScore(d) {
  const q = state.query.trim().toLowerCase();
  if (!q) return d.popularity;
  const hay = `${d.city} ${d.country} ${d.region} ${d.activities.join(" ")} ${d.mustSee.join(" ")} ${d.mustEat.join(" ")}`.toLowerCase();
  let score = d.popularity;
  if (d.city.toLowerCase().includes(q)) score += 60;
  if (d.country.toLowerCase().includes(q)) score += 35;
  d.activities.forEach((a) => { if (a.toLowerCase().includes(q)) score += 25; });
  if (hay.includes(q)) score += 15;
  return score;
}

function filteredDestinations() {
  return DESTINATIONS
    .filter((d) => state.activity === "all" || d.activities.includes(state.activity))
    .filter((d) => state.region === "all" || d.region === state.region)
    .filter((d) => {
      if (state.season === "all") return true;
      return state.season === "peak" ? Boolean(d.peakSeason) : Boolean(d.offSeason);
    })
    .filter((d) => {
      if (!state.query) return true;
      return relevanceScore(d) > d.popularity;
    })
    .map((d) => ({ ...d, relevance: relevanceScore(d) }))
    .sort((a, b) => {
      switch (state.sort) {
        case "popularity": return b.popularity - a.popularity;
        case "budgetAsc": return a.budget - b.budget;
        case "budgetDesc": return b.budget - a.budget;
        case "duration": return a.recommendedDays - b.recommendedDays;
        default: return b.relevance - a.relevance;
      }
    });
}

function renderCards() {
  const list = filteredDestinations();
  resultCountEl.textContent = `${list.length} destinations matched (out of ${DESTINATIONS.length})`;

  gridEl.innerHTML = list
    .map((d) => `
      <article class="panel card">
        <img src="${d.image}" alt="${d.city}" loading="lazy" />
        <div class="card-content">
          <h3>${d.city}, ${d.country}</h3>
          <p class="meta">${d.region} · Currency: ${d.currency} · TZ: ${d.timezone}</p>
          <div class="tags">${d.activities.map((a) => `<span class="tag">${a}</span>`).join("")}</div>
          <p class="meta">Best: ${d.bestMonths} · Peak: ${d.peakSeason} · Off: ${d.offSeason}</p>
          <p class="meta">Avoid: ${d.avoidMonths} · Recommended stay: ${d.recommendedDays} days · Budget index: ${d.budget}</p>
          <div class="card-actions">
            <button class="btn" onclick="openDestination(${d.id})">View Plan</button>
            <label class="meta"><input class="compare-toggle" type="checkbox" ${state.selectedCompare.has(d.id) ? "checked" : ""} onchange="toggleCompare(${d.id}, this.checked)" /> Compare</label>
          </div>
        </div>
      </article>`)
    .join("");

  renderMap(list);
}

let map, markerLayer;
function initMap() {
  map = L.map("map").setView([20, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
}

function renderMap(list) {
  markerLayer.clearLayers();
  list.forEach((d) => {
    const marker = L.marker([d.lat, d.lon]).addTo(markerLayer);
    marker.bindPopup(`<strong>${d.city}</strong><br>${d.country}<br>${d.activities.join(', ')}`);
    marker.on("click", () => openDestination(d.id));
  });
}

async function getWeather(d) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current;
    if (!c) return "Weather unavailable";
    return `${c.temperature_2m}°C (feels ${c.apparent_temperature}°C), wind ${c.wind_speed_10m} km/h`;
  } catch {
    return "Weather unavailable";
  }
}

window.openDestination = async function (id) {
  const d = DESTINATIONS.find((x) => x.id === id);
  if (!d) return;
  detailEl.innerHTML = `<h2>${d.city}, ${d.country}</h2><p class="meta">Loading weather...</p>`;
  detailDialog.showModal();
  const weather = await getWeather(d);

  detailEl.innerHTML = `
    <h2>${d.city}, ${d.country}</h2>
    <div class="detail-grid">
      <div>
        <img src="${d.image}" alt="${d.city}" style="width:100%;border-radius:10px;" />
        <p><strong>Weather now:</strong> ${weather}</p>
        <p><strong>Currency:</strong> ${d.currency} · <strong>Timezone:</strong> ${d.timezone}</p>
        <p><strong>Best months:</strong> ${d.bestMonths} · <strong>Peak:</strong> ${d.peakSeason} · <strong>Off-season:</strong> ${d.offSeason}</p>
        <p><strong>Months to avoid:</strong> ${d.avoidMonths} · <strong>Recommended duration:</strong> ${d.recommendedDays} days</p>
      </div>
      <div>
        <iframe height="240" src="${d.video}" title="${d.city} travel video" loading="lazy" allowfullscreen></iframe>
        <h4>Must See</h4><ul>${d.mustSee.map((x) => `<li>${x}</li>`).join("")}</ul>
        <h4>Must Do</h4><ul>${d.mustDo.map((x) => `<li>${x}</li>`).join("")}</ul>
        <h4>Must Eat</h4><ul>${d.mustEat.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    </div>
    <h3>3 / 5 / 7 Day Itinerary Samples</h3>
    <div class="cols3">
      ${[3,5,7].map((days) => `<div class="itinerary"><h4>${days} Days</h4><ol>${d.itineraries[days].map((i) => `<li>${i}</li>`).join("")}</ol></div>`).join("")}
    </div>
    <p><strong>Similar destinations:</strong> ${d.similar.join(", ")}</p>
  `;
};

window.toggleCompare = function(id, checked) {
  if (checked && state.selectedCompare.size >= 3) {
    alert("Compare supports up to 3 destinations.");
    renderCards();
    return;
  }
  if (checked) state.selectedCompare.add(id);
  else state.selectedCompare.delete(id);
};

function openCompare() {
  const selected = DESTINATIONS.filter((d) => state.selectedCompare.has(d.id));
  if (selected.length < 2) {
    alert("Select at least 2 destinations to compare.");
    return;
  }

  const rows = [
    ["Destination", ...selected.map((d) => `${d.city}, ${d.country}`)],
    ["Activities", ...selected.map((d) => d.activities.join(", "))],
    ["Budget Index", ...selected.map((d) => d.budget)],
    ["Best Months", ...selected.map((d) => d.bestMonths)],
    ["Peak Season", ...selected.map((d) => d.peakSeason)],
    ["Off Season", ...selected.map((d) => d.offSeason)],
    ["Avoid Months", ...selected.map((d) => d.avoidMonths)],
    ["Recommended Days", ...selected.map((d) => d.recommendedDays)],
    ["Currency", ...selected.map((d) => d.currency)],
    ["Timezone", ...selected.map((d) => d.timezone)],
    ["Must See", ...selected.map((d) => d.mustSee.join("; "))],
    ["Must Eat", ...selected.map((d) => d.mustEat.join("; "))],
  ];

  compareContent.innerHTML = `
    <h2>Destination Comparison</h2>
    <table class="compare-table">
      ${rows.map((r, idx) => `<tr>${r.map((c, cidx) => idx === 0 || cidx === 0 ? `<th>${c}</th>` : `<td>${c}</td>`).join("")}</tr>`).join("")}
    </table>
  `;
  compareDialog.showModal();
}

function randomDestination() {
  const d = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
  state.query = d.city;
  document.getElementById("searchInput").value = d.city;
  renderCards();
  openDestination(d.id);
}

document.getElementById("searchInput").addEventListener("input", (e) => { state.query = e.target.value; renderCards(); });
document.getElementById("sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderCards(); });
activityFilterEl.addEventListener("change", (e) => { state.activity = e.target.value; renderCards(); });
regionFilterEl.addEventListener("change", (e) => { state.region = e.target.value; renderCards(); });
document.getElementById("seasonFilter").addEventListener("change", (e) => { state.season = e.target.value; renderCards(); });
document.getElementById("randomBtn").addEventListener("click", randomDestination);
document.getElementById("compareBtn").addEventListener("click", openCompare);
document.getElementById("clearCompareBtn").addEventListener("click", () => { state.selectedCompare.clear(); renderCards(); });
document.getElementById("closeDialog").addEventListener("click", () => detailDialog.close());
document.getElementById("closeCompareDialog").addEventListener("click", () => compareDialog.close());

initMap();
renderCards();
