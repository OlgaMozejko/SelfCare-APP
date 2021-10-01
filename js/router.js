/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
  "#/": "welcome",
  "#/onboard1": "onboard1",
  "#/onboard2": "onboard2",
  "#/onboard3": "onboard3",
  "#/onboard4": "onboard4",
  "#/home": "home",
  "#/favorites": "favorites",
  "#/settings": "settings",
  "#/timeSelection": "timeSelection",
  "#/allActivities": "allActivities",
  "#/detailedView": "detailedView",
};

/**
 * Initialising the router, calling attachNavLinkEvents() and navigateTo()
 */
function initRouter() {
  attachNavLinkEvents();

  let defaultPath = "#/";
  if (routes[location.hash]) {
    defaultPath = location.hash;
  }
  navigateTo(defaultPath);
}

initRouter();

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", function (event) {
      const path = link.getAttribute("href");
      navigateTo(path);
      event.preventDefault();
    });
  }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
export function navigateTo(pathname) {
  hideAllPages();
  const basePath = location.pathname.replace("index.html", "");
  window.history.pushState({}, pathname, basePath + pathname);
  document.querySelector(`#${routes[pathname]}`).style.display = "block";
  setActiveTab(pathname);
}

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  for (const page of pages) {
    page.style.display = "none";
  }
}

/**
 * sets active tab bar/ menu item
 */
function setActiveTab(pathname) {
  const navLinks = document.querySelectorAll("nav a");
  for (const link of navLinks) {
    if (pathname === link.getAttribute("href")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}


//Hiding the menu which is fighting me - Bara

// let cUrl = window.location.href;

// if (cUrl.indexOf("home") != -1 ||
//   cUrl.indexOf("favorites") != -1 ||
//   cUrl.indexOf("settings") != -1 ||
//   cUrl.indexOf("timeSelection") != -1 ||
//   cUrl.indexOf("allActivities") != -1 ||
//   cUrl.indexOf("detailedView") != -1) {
//   menu.style.display = "flex";
// } else {
//   menu.style.display = "none";
// }