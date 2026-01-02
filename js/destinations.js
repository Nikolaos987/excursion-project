lucide.createIcons();

const destinations = [
  {
    id: 1,
    name: "Rila Monastery",
    city: "Rila",
    region: "Rila Mountains",
    difficulty: "easy",
    familyFriendly: true,
    bestSeasons: ["spring", "summer", "autumn"],
    description: "Historic monastery nestled in the Rila Mountains.",
    imageUrl: "/placeholder.svg",
    popular: true,
    tags: ["culture", "history"],
  },
  {
    id: 2,
    name: "Seven Rila Lakes",
    city: "Sapareva Banya",
    region: "Rila Mountains",
    difficulty: "moderate",
    familyFriendly: false,
    bestSeasons: ["summer"],
    description: "Famous glacial lakes with breathtaking views.",
    imageUrl: "/placeholder.svg",
    popular: true,
    tags: ["hiking", "nature"],
  },
];

const searchInput = document.getElementById("searchInput");
const grid = document.getElementById("destinationsGrid");
const empty = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const headerCount = document.getElementById("header-count");

headerCount.textContent = `Discover ${destinations.length} amazing places across Bulgaria.`;

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
    card.innerHTML = `
      <img src="${d.imageUrl}">
      <div class="card-body">
        <h3>${d.name}</h3>
        <p>${d.city}, ${d.region}</p>
        <p>${d.description}</p>
        <span class="badge">${d.difficulty}</span>
      </div>
      <div class="card-footer">
        <button class="btn primary">View Details</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

const filtersBtn = document.getElementById("filtersBtn");
const filterPanel = document.getElementById("filterPanel");

let showFilters = false;

filtersBtn.addEventListener("click", () => {
  showFilters = !showFilters;
  filterPanel.classList.toggle("hidden", !showFilters);
});

filtersBtn.classList.toggle("active", showFilters);

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  render(
    destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    )
  );
});

render(destinations);
