const results = document.querySelector("#application-results");

const urlParams = new URLSearchParams(window.location.search);

const firstName = urlParams.get("firstName");
const lastName = urlParams.get("lastName");
const email = urlParams.get("email");
const phone = urlParams.get("phone");
const organization = urlParams.get("organization");
const timestamp = urlParams.get("timestamp");

results.innerHTML = `
    <div class="application-summary">
        <h3>Application Information</h3>
        
        <p>
            <strong>First Name:</strong> ${firstName}
        </p>
        <p>
            <strong>Last Name:</strong> ${lastName}
        </p>
        <p>
            <strong>Email:</strong> ${email}
        </p>
        <p>
            <strong>Phone:</strong> ${phone}
        </p>
        <p>
            <strong>Organization:</strong> ${organization}
        </p>
        <p>
            <strong>Timestamp:</strong> ${timestamp}
        </p>

        <p>Your application has been received.</p>
    </div>
`;

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Navigation menu toggle

const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-navigation");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        primaryNav.classList.toggle("open");
        const isOpen = primaryNav.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}