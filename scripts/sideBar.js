// ======================
// DOM Elements
// ======================
const sidebar = document.getElementById("side-bar-div");
const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
const showSidebarBtn = document.getElementById("show-sidebar-btn");

const mobileMenu = document.getElementById("mobile-menu");
const logoMobile = document.getElementById("logo-mobile");
const closeMobileMenuBtn = document.getElementById("close-mobile-menu");

const themeSwitch = document.getElementById("theme-switch");
const mobileThemeSwitch = document.getElementById("mobile-theme-switch");

// ======================
// Sidebar Hide/Show Logic
// ======================
let isSidebarHidden = localStorage.getItem("sidebarHidden") === "true";

function updateSidebarDisplay() {
  if (window.innerWidth <= 1023) {
    // Tablet/mobile: hide sidebar and buttons, let CSS handle layout
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "none";
    hideSidebarBtn.style.display = "none";
    return;
  }
  // Desktop: JS controls sidebar
  hideSidebarBtn.style.display = "block";
  if (isSidebarHidden) {
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "block";
  } else {
    sidebar.style.display = "flex";
    showSidebarBtn.style.display = "none";
  }
}

// Listen for window resize to update sidebar display
window.addEventListener("resize", updateSidebarDisplay);

updateSidebarDisplay();

hideSidebarBtn.addEventListener("click", () => {
  isSidebarHidden = true;
  localStorage.setItem("sidebarHidden", "true");
  updateSidebarDisplay();
});

showSidebarBtn.addEventListener("click", () => {
  isSidebarHidden = false;
  localStorage.setItem("sidebarHidden", "false");
  updateSidebarDisplay();
});

updateSidebarDisplay();

// ======================
// Mobile Menu Logic
// ======================
logoMobile.addEventListener("click", () => {
  mobileMenu.style.display = "block";
});

closeMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

// ======================
// Theme Toggle Sync (Desktop + Mobile)
// ======================
function setTheme(darkMode) {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
    mobileThemeSwitch.checked = true;
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    themeSwitch.checked = false;
    mobileThemeSwitch.checked = false;
    localStorage.setItem("theme", "light");
  }
}

themeSwitch.addEventListener("change", () => {
  setTheme(themeSwitch.checked);
});

mobileThemeSwitch.addEventListener("change", () => {
  setTheme(mobileThemeSwitch.checked);
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setTheme(true);
} else {
  setTheme(false);
}
