import { destinations } from "/data/destinations-data";

const grid = document.getElementById("destinationsGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const seasonFilter = document.getElementById("seasonFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const familyBtn = document.getElementById("familyBtn");
const filtersBtn = document.getElementById("filtersBtn");
const filterPanel = document.getElementById("filterPanel");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const activeFilters = document.getElementById("activeFilters");
const clearFiltersBtn = document.getElementById("clearFilters");
const clearEmptyBtn = document.getElementById("clearEmpty");

let showFilters = false;
let familyOnly = false;

// Populate region filter options
const regions = [...new Set(destinations.map((d) => d.region))].sort();
regions.forEach((r) => {
  const opt = document.createElement("option");
  opt.value = r;
  opt.textContent = r;
  regionFilter.appendChild(opt);
});

// ---- FUNCTIONS ----
function createCard(dest) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
          <img src="${dest.imageUrl}" alt="${dest.name}" />
          <div class="card-content">
            <h3>${dest.name}</h3>
            <div class="meta">${dest.city} • ${dest.region} • ${
    dest.difficulty
  }</div>
            <p>${dest.description}</p>
            <div class="tags">${dest.tags
              .map((t) => `<span class="tag">${t}</span>`)
              .join("")}</div>
          </div>
        `;
  return card;
}

function renderDestinations() {
  const query = searchInput.value.toLowerCase();
  const region = regionFilter.value;
  const season = seasonFilter.value;
  const difficulty = difficultyFilter.value;

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.city.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesRegion = region === "all" || d.region === region;
    const matchesSeason =
      season === "all" ||
      d.bestSeasons.includes(season) ||
      d.bestSeasons.includes("all-year");
    const matchesDifficulty =
      difficulty === "all" || d.difficulty === difficulty;
    const matchesFamily = !familyOnly || d.familyFriendly;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesSeason &&
      matchesDifficulty &&
      matchesFamily
    );
  });

  grid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach((d) => grid.appendChild(createCard(d)));
  }

  resultsCount.textContent = `Showing ${filtered.length} of ${destinations.length} destinations`;
}

function updateActiveFilters() {
  activeFilters.innerHTML = "";
  if (searchInput.value)
    activeFilters.innerHTML += `<span class="tag">Search: ${searchInput.value}</span>`;
  if (regionFilter.value !== "all")
    activeFilters.innerHTML += `<span class="tag">${regionFilter.value}</span>`;
  if (seasonFilter.value !== "all")
    activeFilters.innerHTML += `<span class="tag">${seasonFilter.value}</span>`;
  if (difficultyFilter.value !== "all")
    activeFilters.innerHTML += `<span class="tag">${difficultyFilter.value}</span>`;
  if (familyOnly)
    activeFilters.innerHTML += `<span class="tag">Family Friendly</span>`;
}

function clearAll() {
  searchInput.value = "";
  regionFilter.value = "all";
  seasonFilter.value = "all";
  difficultyFilter.value = "all";
  familyOnly = false;
  familyBtn.textContent = "Any";
  renderDestinations();
  updateActiveFilters();
}

// ---- EVENT LISTENERS ----
filtersBtn.addEventListener("click", () => {
  showFilters = !showFilters;
  filterPanel.classList.toggle("hidden", !showFilters);
});

familyBtn.addEventListener("click", () => {
  familyOnly = !familyOnly;
  familyBtn.textContent = familyOnly ? "Yes" : "Any";
  renderDestinations();
  updateActiveFilters();
});

searchInput.addEventListener("input", () => {
  renderDestinations();
  updateActiveFilters();
});

regionFilter.addEventListener("change", () => {
  renderDestinations();
  updateActiveFilters();
});
seasonFilter.addEventListener("change", () => {
  renderDestinations();
  updateActiveFilters();
});
difficultyFilter.addEventListener("change", () => {
  renderDestinations();
  updateActiveFilters();
});

clearFiltersBtn.addEventListener("click", clearAll);
clearEmptyBtn.addEventListener("click", clearAll);

// Initial render
renderDestinations();
updateActiveFilters();
lucide.replace();

destinations.js