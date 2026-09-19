const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const membersContainer = document.querySelector("#members");
async function getMembers() {
    const response = await fetch("data/members.json");

    const members = await response.json();

    displayMembers(members);
}

getMembers();

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
                    <strong>email:</strong>
                    ${member.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
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

function setView(view) {
    if (view === "list") {
        membersContainer.classList.add("members-list");
        membersContainer.classList.remove("members-grid");
    } else {
        membersContainer.classList.add("members-grid");
        membersContainer.classList.remove("members-list");
    }
}

gridButton.addEventListener("click", () => {
    setView("grid");
});

listButton.addEventListener("click", () => {
    setView("list");
});

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

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;