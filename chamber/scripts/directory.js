const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const membersContainer = document.querySelector("#members");

// Get members from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);
        } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML = `
            <p class="error-message">
                Unable to load member information.
                Please try again later.
            </p>
        `;
    }
}

// Display membership level
function getMembershipLevel(level) {
    switch (level) {
        case 3:
            return "Gold";
        case 2:
            return "Silver";
        case 1:
            return "Member";
        default:
            return "Member";
    }
}

// Display membership Level

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.className = "member-card";

        card.innerHTML = `
            <img
                class="member-image"
                src="images/${member.image}"
                alt="${member.name} business image"
                loading="lazy"
            >
            <div class="member-content">

                <h2>${member.name}</h2>
                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>
                <p>
                    <strong>Email:</strong>
                    <a href="mailto:${member.email}">
                        ${member.email}
                    </a>
                </p>
                <p>
                    <strong>Phone:</strong>
                    <a href="tel:${member.phone}">
                        ${member.phone}
                    </a>
                </p>
                <p>
                    <strong>Membership:</strong>
                    ${getMembershipLevel(member.membershipLevel)}
                </p>
                <p>
                    <strong>Website:</strong>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener"
                    >
                        Visit Website
                    </a>
                </p>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

// Change between grid and list views

function setView(view) {
    if (view === "list") {
        membersContainer.classList.add("members-list");
        membersContainer.classList.remove("members-grid");
        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");
    } else {
        membersContainer.classList.add("members-grid");
        membersContainer.classList.remove("members-list");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    }
}

// Grid button
gridButton.addEventListener("click", () => {
    setView("grid");
});

// List button

listButton.addEventListener("click", () => {
    setView("list");
});

// Mobile navigation

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Current year

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

// Last modified date

document.querySelector("#lastModified").textContent =
    document.lastModified;

// Load members
getMembers();