// Get application results container
const results = document.querySelector("#application-results");

// Get form data from URL
const urlParams = new URLSearchParams(window.location.search);

const firstName = urlParams.get("firstName") || "";
const lastName = urlParams.get("lastName") || "";
const email = urlParams.get("email") || "";
const phone = urlParams.get("phone") || "";
const business = urlParams.get("business") || "";
const timestamp = urlParams.get("timestamp") || "";


// Display application information
if (results) {
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
                <strong>Mobile Phone:</strong> ${phone}
            </p>

            <p>
                <strong>Business / Organization:</strong> ${business}
            </p>

            <p>
                <strong>Application Date and Time:</strong> ${timestamp}
            </p>

            <p>Your application has been received.</p>
        </div>
    `;
}


// Current year
const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Last modified date
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Navigation menu toggle
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {

        const isOpen = primaryNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}