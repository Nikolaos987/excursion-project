lucide.createIcons();

const formCard = document.getElementById("formCard");
const results = document.getElementById("results");

document.getElementById("generateBtn").addEventListener("click", () => {
  const days = Number(document.getElementById("days").value) || 3;
  const tourists = document.getElementById("tourists").value;

  const hasChildren = document.querySelector(
    'input[name="children"]:checked'
  ).value;

  const physical = document.querySelector(
    'input[name="physical"]:checked'
  ).value;

  // 1. FILTER DESTINATIONS
  let filteredDestinations = destinations.filter((d) => {
    if (hasChildren === "yes" && !d.familyFriendly) return false;
    if (physical !== "high" && d.difficulty === "difficult") return false;
    return true;
  });

  // 2. PICK DESTINATIONS BASED ON DAYS
  const count = Math.min(Math.max(2, days), filteredDestinations.length);
  const selectedDestinations = filteredDestinations
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // 3. MATCH ROUTES (THIS IS THE NEW PART)
  const matchedRoutes = routes.filter((route) => {
    // difficulty check
    if (physical !== "high" && route.difficulty === "difficult") return false;

    // must include at least one selected destination
    return route.destinations.some((id) =>
      selectedDestinations.find((d) => d.id === id)
    );
  });

  // limit routes (optional)
  const suggestedRoutes = matchedRoutes.slice(0, 2);

  // 4. RENDER RESULTS
  formCard.classList.add("hidden");
  results.classList.remove("hidden");

  results.innerHTML = `
    <div class="card">
      <h2>Your Personalized Itinerary</h2>
      <p class="muted">
        Based on ${days} day(s) for ${tourists} traveler(s)
        ${hasChildren === "yes" ? " with children" : ""}
      </p>
    </div>

    <div class="card result-card">
      <h3>Recommended Destinations</h3>

      <div class="destination-grid">
        ${selectedDestinations
          .map(
            (d) => `
          <a href="/pages/destination.html?id=${d.id}" class="destination-item">
            <img src="${d.imageUrl}" />
            <div class="content">
              <strong>${d.name}</strong>
              <p class="muted">${d.city}</p>
              <span class="badge">${d.difficulty}</span>
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    </div>

    ${
      suggestedRoutes.length
        ? `
      <div class="card result-card">
        <h3>Suggested Routes</h3>

        <div class="routes-list">
          ${suggestedRoutes
            .map(
              (r) => `
            <div class="route-item">
              <h4>${r.name}</h4>
              <p class="muted">${r.description}</p>
              <div class="route-meta">
                <span class="badge">${r.duration}</span>
                <span class="badge ${r.difficulty}">${r.difficulty}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : ""
    }

    <button class="btn outline large" onclick="location.reload()">
      Generate New Itinerary
    </button>
  `;

  lucide.createIcons();
});
