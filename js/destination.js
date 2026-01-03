lucide.createIcons();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const destination = destinations.find((d) => d.id === id);

if (!destination) {
  window.location.href = "/pages/destinations.html";
}

document.getElementById("heroImage").src = destination.imageUrl;
document.getElementById("name").textContent = destination.name;
document.getElementById(
  "location"
).textContent = `${destination.city}, ${destination.region}`;
document.getElementById("description").textContent = destination.description;
document.getElementById("difficulty").textContent = destination.difficulty;
document.getElementById("family").textContent = destination.familyFriendly
  ? "Yes"
  : "No";
document.getElementById("seasons").textContent =
  destination.bestSeasons.join(", ");

if (destination.popular) {
  document.getElementById("popularBadge").classList.remove("hidden");
}

const tagsEl = document.getElementById("tags");
destination.tags.forEach((tag) => {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = tag;
  tagsEl.appendChild(span);
});

/* Mock amenities + routes for now (same visual as Next.js) */
const amenities = document.getElementById("amenities");
["Cafe · 1km", "Restaurant · 3km", "Pharmacy · 12km"].forEach((text) => {
  const div = document.createElement("div");
  div.className = "amenity";
  div.innerHTML = `
    <div class="amenity-icon"><i data-lucide="coffee"></i></div>
    <div>
      <strong>${text.split("·")[0]}</strong>
      <p class="muted">${text}</p>
    </div>
  `;
  amenities.appendChild(div);
});

lucide.createIcons();
