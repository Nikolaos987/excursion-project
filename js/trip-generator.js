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

  let filtered = destinations.filter((d) => {
    if (hasChildren === "yes" && !d.familyFriendly) return false;
    if (physical !== "high" && d.difficulty === "difficult") return false;
    return true;
  });

  const count = Math.min(Math.max(2, days), filtered.length);
  filtered = filtered.sort(() => Math.random() - 0.5).slice(0, count);

  formCard.classList.add("hidden");
  results.classList.remove("hidden");

  results.innerHTML = `
    <div class="card">
      <h2>Your Personalized Itinerary</h2>
      <p class="muted">
        Based on ${days} day(s) for ${tourists} traveler(s)
      </p>
    </div>

    <div class="card result-card">
      <h3>Recommended Destinations</h3>

      <div class="destination-grid">
        ${filtered
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

      <button class="btn outline large" onclick="location.reload()">
        Generate New Itinerary
      </button>
    </div>
  `;

  lucide.createIcons();
});
