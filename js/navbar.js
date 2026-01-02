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
