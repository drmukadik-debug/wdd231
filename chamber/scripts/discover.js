import { discoverItems } from "../data/discover.mjs";

// Function to create a card for each discover item

const discoverGrid = document.querySelector("#discover-grid");

function displayDiscoverItems(items) {
    if (!discoverGrid) {
        return;
    }

    discoverGrid.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("article");

        card.className = `discover-card item-${index + 1}`;
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more">Learn More</button>
            `;

            discoverGrid.appendChild(card);
    });
}

// Display the eight places

displayDiscoverItems(discoverItems);

const visitMessage = document.querySelector("#visit-message")

const currentVisit = Date.now();
const previousVisit = localStorage.getItem("discoverLastVisit");

if (visitMessage) {

    if (!previousVisit) {

        // First visit
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";

    } else {

        const difference =
            currentVisit - Number(previousVisit);

        const daysSinceVisit = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        if (daysSinceVisit < 1) {

            visitMessage.textContent =
                "Back so soon! Awesome!";

        } else if (daysSinceVisit === 1) {

            visitMessage.textContent =
                "You last visited 1 day ago.";

        } else {

            visitMessage.textContent =
                `You last visited ${daysSinceVisit} days ago.`;
        }
    }
}

// Save current visit
localStorage.setItem(
    "discoverLastVisit",
    currentVisit
);

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent =
        document.lastModified;
}

// Mobile Navigation

const menuButton =
    document.querySelector("#menu-button");

const primaryNav =
    document.querySelector("#primary-nav");

if (menuButton && primaryNav) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            primaryNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });
}