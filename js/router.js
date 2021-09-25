/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
    "#/": "home",
    "#/favorites": "favorites",
    "#/settings": "settings",
    "#/timeSelection": "timeSelection",
    "#/allActivities": "allActivities"

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
function navigateTo(pathname) {
    hideAllPages();
    const basePath = location.pathname.replace("index.html", "");
    window.history.pushState({}, pathname, basePath + pathname);
    document.querySelector(`#${routes[pathname]}`).style.display = "block";
    setActiveTab(pathname);
};

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

// order function - Marius
function orderBy(value) {
    if (value === "environment") {
        orderByBrand();
    } else if (value === "latest") {
        orderByModel();
    } else if (value === "oldest") {
        orderByModel();
    }
}

// order by environment of the activity function - Marius
function orderByIndoors() {
    _activities.sort((activity1, activity2) => {
        return activity1.environment.localeCompare(activity2.environment);
    });
    appendProducts(_activities);
}

// order by latest activities function - Marius
function orderByLatest() {
    _activities.sort((activity1, activity2) => {
        return activity1.date.localeCompare(activity2.date);
    });
    appendProducts(_activities);
}

// order by oldest activities function - Marius
function orderByOldest() {
    _activities.sort((activity1, activity2) => {
        return activity2.date.localeCompare(activity1.date);
    });
    appendProducts(_activities);
}
// filter by emotions function - Marius
function filterByEmotions(value) {
    const buttons = document.querySelectorAll(".filter-container .filterByEmotions");
    for (const button of buttons)
        if (value === button.getAttribute("id")) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }

    if (value == "all") {
        appendProducts(_activities);
    } else {
        const results = _activities.filter(activity => activity.emotionType == value);
        appendProducts(results)
    }
}

// reset by emotions function - Marius
function resetFilterByEmotions() {
    document.querySelector("#filterByEmotions").value = "all";
}