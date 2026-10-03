// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        primaryNav.classList.toggle("open");
        
        const isOpen = primaryNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded", isOpen
        );
    });
}

// Current year

const currentYear = document.querySelector("#currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Last modified date

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Timestamp for join page

const timestamp = document.querySelector("#timestamp");
if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Membership modals

const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach(link => {
    link.addEventListener("click", () => {
        const modalId = link.dataset.modalId;
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });
});

// close modal when clicking outside of it

const modals = document.querySelectorAll("dialog");

modals.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
