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

  /* ---------------- FILTER DESTINATIONS ---------------- */
  const filtered = destinations.filter((d) => {
    if (hasChildren === "yes" && !d.familyFriendly) return false;
    if (physical !== "high" && d.difficulty === "difficult") return false;
    return true;
  });

  const count = Math.min(Math.max(2, days), filtered.length);

  const popular = filtered.filter((d) => d.popular);
  const hidden = filtered.filter((d) => !d.popular);

  const selected = [];
  const popularCount = Math.ceil(count * 0.7);

  selected.push(
    ...popular.sort(() => Math.random() - 0.5).slice(0, popularCount)
  );
  selected.push(
    ...hidden.sort(() => Math.random() - 0.5).slice(0, count - popularCount)
  );

  /* ---------------- MATCH ROUTES ---------------- */
  const suggestedRoutes = routes
    .filter((r) => {
      if (physical !== "high" && r.difficulty === "difficult") return false;
      return r.destinations.some((id) => selected.find((d) => d.id === id));
    })
    .slice(0, 2);

  /* ---------------- GENERATE TIPS ---------------- */
  const tips = [];

  if (hasChildren === "yes") {
    tips.push(
      "All recommended destinations are family-friendly with nearby amenities."
    );
    tips.push("Consider shorter hiking distances and regular breaks.");
  }

  if (physical === "low") {
    tips.push("These destinations require minimal physical effort.");
  } else if (physical === "high") {
    tips.push("Start hikes early and bring plenty of water.");
  }

  tips.push(
    `Plan for ${Math.ceil(
      days / selected.length
    )} day(s) per destination for a relaxed pace.`
  );

  /* ---------------- RENDER ---------------- */
  formCard.classList.add("hidden");
  results.classList.remove("hidden");

  results.innerHTML = `
    <!-- HEADER CARD -->
    <div class="card card-primary">
      <h2>Your Personalized Itinerary</h2>
      <p>
        Based on ${days} day(s) for ${tourists} traveler(s)
        ${hasChildren === "yes" ? " with children" : ""}
      </p>
    </div>

    <!-- TIPS -->
    ${
      tips.length
        ? `
      <div class="card">
        <h3>Travel Tips</h3>
        <ul class="tips-list">
          ${tips
            .map(
              (t) => `
            <li>
              <i data-lucide="arrow-right"></i>
              <span>${t}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `
        : ""
    }

    <!-- DESTINATIONS -->
    <div class="card">
      <h3>Recommended Destinations</h3>
      <p class="muted">We've selected ${
        selected.length
      } perfect destinations for your trip</p>

      <div class="destination-grid">
        ${selected
          .map(
            (d) => `
          <a href="/pages/destination.html?id=${d.id}" class="destination-card">
            <div class="image-wrap">
              <img src="${d.imageUrl}" />
              ${d.popular ? `<span class="badge popular">Popular</span>` : ""}
            </div>
            <div class="content">
              <h4>${d.name}</h4>
              <p class="muted">${d.city}</p>
              <div class="badges">
                <span class="badge ${d.difficulty}">${d.difficulty}</span>
                ${
                  d.familyFriendly
                    ? `<span class="badge outline">Family Friendly</span>`
                    : ""
                }
              </div>
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    </div>

    <!-- ROUTES -->
    ${
      suggestedRoutes.length
        ? `
      <div class="card">
        <h3>Suggested Routes</h3>
        <p class="muted">Pre-planned routes that match your criteria</p>

        <div class="routes-list">
          ${suggestedRoutes
            .map(
              (r) => `
            <div class="route-card">
              <div class="route-header">
                <div>
                  <h4>${r.name}</h4>
                  <p class="muted">${r.description}</p>
                </div>
              </div>
              <div class="badges">
                <span class="badge secondary">${r.duration}</span>
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

    <div class="actions">
      <button class="btn outline large" onclick="location.reload()">
        Generate New Itinerary
      </button>
    </div>
  `;

  lucide.createIcons();
});
