lucide.createIcons();

const searchInput = document.getElementById("searchInput");
const grid = document.getElementById("destinationsGrid");
const empty = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const headerCount = document.getElementById("header-count");

const regionFilter = document.getElementById("regionFilter");
const seasonFilter = document.getElementById("seasonFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const familyBtn = document.getElementById("familyBtn");
const activeFilters = document.getElementById("activeFilters");
const clearFiltersBtn = document.getElementById("clearFilters");

const filtersBtn = document.getElementById("filtersBtn");
const filterPanel = document.getElementById("filterPanel");

headerCount.textContent = `Discover ${destinations.length} amazing places across Bulgaria. Use filters to find your perfect adventure.`;

/* -----------------------------
   FILTER STATE (React-like)
--------------------------------*/
let filters = {
  search: "",
  region: "all",
  season: "all",
  difficulty: "all",
  familyFriendly: false,
};

/* -----------------------------
   INIT REGIONS DROPDOWN
--------------------------------*/
function initRegions() {
  const regions = [...new Set(destinations.map((d) => d.region))].sort();

  regionFilter.innerHTML = `<option value="all">All regions</option>`;

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });
}

/* -----------------------------
   FILTER LOGIC (CORE)
--------------------------------*/
function applyFilters() {
  const filtered = destinations.filter((d) => {
    const matchesSearch =
      !filters.search ||
      d.name.toLowerCase().includes(filters.search) ||
      d.city.toLowerCase().includes(filters.search) ||
      d.description.toLowerCase().includes(filters.search) ||
      d.tags.some((tag) => tag.toLowerCase().includes(filters.search));

    const matchesRegion =
      filters.region === "all" || d.region === filters.region;

    const matchesSeason =
      filters.season === "all" ||
      d.bestSeasons.includes(filters.season) ||
      d.bestSeasons.includes("all-year");

    const matchesDifficulty =
      filters.difficulty === "all" || d.difficulty === filters.difficulty;

    const matchesFamily = !filters.familyFriendly || d.familyFriendly;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesSeason &&
      matchesDifficulty &&
      matchesFamily
    );
  });

  render(filtered);
  renderActiveFilters();
}

/* -----------------------------
   RENDER CARDS
--------------------------------*/
function render(list) {
  grid.innerHTML = "";
  resultsCount.textContent = `Showing ${list.length} of ${destinations.length} destinations`;

  if (!list.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  list.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () =>
      (window.location.href = `/pages/destination.html?id=${d.id}`);

    card.innerHTML = `
      <div class="card-image">
        <img src="${d.imageUrl}" alt="${d.name}" />

        ${
          d.popular
            ? `<span class="badge badge-primary badge-popular">Popular</span>`
            : ""
        }

        <button class="favorite-btn" onclick="event.stopPropagation()">
          <i data-lucide="heart"></i>
        </button>
      </div>

      <div class="card-body">
        <h3>${d.name}</h3>

        <div class="card-location">
          <i data-lucide="map-pin"></i>
          <span>${d.city}, ${d.region}</span>
        </div>

        <p class="muted">${d.description}</p>

        <div class="badges-row">
          <span class="badge badge-difficulty ${d.difficulty}">
            ${d.difficulty}
          </span>

          ${
            d.familyFriendly
              ? `<span class="badge badge-outline">
                  <i data-lucide="users"></i>
                  Family Friendly
                </span>`
              : ""
          }
        </div>
      </div>

      <button class="btn primary" onclick="event.stopPropagation(); location.href='/pages/destination.html?id=${
        d.id
      }'">
        View Details
      </button>
    `;

    grid.appendChild(card);
  });

  lucide.createIcons();
}

/* -----------------------------
   ACTIVE FILTER BADGES
--------------------------------*/
function renderActiveFilters() {
  activeFilters.innerHTML = "";

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value &&
      value !== "all" &&
      !(key === "familyFriendly" && value === false)
    ) {
      const badge = document.createElement("span");
      badge.className = "badge secondary";
      badge.innerHTML = `
        ${key === "familyFriendly" ? "Family Friendly" : value}
        <button onclick="clearFilter('${key}')">
          <i data-lucide="x"></i>
        </button>
      `;
      activeFilters.appendChild(badge);
    }
  });

  lucide.createIcons();
}

function clearFilter(key) {
  if (key === "familyFriendly") {
    filters.familyFriendly = false;
    familyBtn.textContent = "Any";
    familyBtn.classList.remove("active");
  } else {
    filters[key] = "all";
    if (key === "search") searchInput.value = "";
    if (key === "region") regionFilter.value = "all";
    if (key === "season") seasonFilter.value = "all";
    if (key === "difficulty") difficultyFilter.value = "all";
  }
  applyFilters();
}

/* -----------------------------
   EVENT LISTENERS
--------------------------------*/
searchInput.addEventListener("input", (e) => {
  filters.search = e.target.value.toLowerCase();
  applyFilters();
});

regionFilter.addEventListener("change", (e) => {
  filters.region = e.target.value;
  applyFilters();
});

seasonFilter.addEventListener("change", (e) => {
  filters.season = e.target.value;
  applyFilters();
});

difficultyFilter.addEventListener("change", (e) => {
  filters.difficulty = e.target.value;
  applyFilters();
});

familyBtn.addEventListener("click", () => {
  filters.familyFriendly = !filters.familyFriendly;
  familyBtn.textContent = filters.familyFriendly ? "Yes" : "Any";
  familyBtn.classList.toggle("active", filters.familyFriendly);
  applyFilters();
});

clearFiltersBtn.addEventListener("click", () => {
  filters = {
    search: "",
    region: "all",
    season: "all",
    difficulty: "all",
    familyFriendly: false,
  };

  searchInput.value = "";
  regionFilter.value = "all";
  seasonFilter.value = "all";
  difficultyFilter.value = "all";
  familyBtn.textContent = "Any";
  familyBtn.classList.remove("active");

  applyFilters();
});

/* -----------------------------
   FILTER PANEL TOGGLE
--------------------------------*/
filtersBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("hidden");
});

/* -----------------------------
   INIT
--------------------------------*/
initRegions();
render(destinations);
