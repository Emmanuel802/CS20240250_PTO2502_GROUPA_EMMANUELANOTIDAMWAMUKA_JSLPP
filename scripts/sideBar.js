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
  if (isSidebarHidden) {
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "block";
  } else {
    sidebar.style.display = "flex";
    showSidebarBtn.style.display = "none";
  }
}

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
