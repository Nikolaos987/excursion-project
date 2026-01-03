lucide.createIcons();

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
let isOpen = false;

menuToggle.addEventListener("click", () => {
  isOpen = !isOpen;
  mobileMenu.style.display = isOpen ? "block" : "none";
  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});

document.querySelectorAll(".mobile-menu .nav-btn").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    isOpen = false;
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

// Avatar Dropdown Logic
const avatarBtn = document.getElementById("avatarBtn");
const avatarMenu = document.getElementById("avatarMenu");
const avatarName = document.getElementById("avatarName");

// Show username if stored
const storedUser = localStorage.getItem("username");
if (storedUser) {
  avatarName.textContent = storedUser;
}

avatarBtn.addEventListener("click", () => {
  avatarMenu.style.display =
    avatarMenu.style.display === "flex" ? "none" : "flex";
  avatarMenu.style.flexDirection = "column";
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!avatarBtn.contains(e.target) && !avatarMenu.contains(e.target)) {
    avatarMenu.style.display = "none";
  }
});
