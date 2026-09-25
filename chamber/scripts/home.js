const membersUrl = "data/members.json";

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

function getRandomMembers(members, number) {
    const shuffled = [...members].sort(() => Math.random( - 0.5);
    return shuffled.slice(0, number);
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlights");

    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >
            <h3>${member.name}</h3>
            <p>
                <strong>Membership:</strong>
                ${getMembershipLevel(member.membershipLevel)}
            </p>
            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>
            <p>
                <strong>Phone:</strong>
                <a href="tel:${member.phone}">
                    ${member.phone}
                </a>
            </p>
            <p>
                <strong>Website:</strong>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            </p>
        `;
        container.appendChild(card);
    });
}
async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        const eligibleMembers = members.filter(
            member =>
                member.membershipLevel === 2 ||
                member.membershipLevel === 3
        );

        const numberOfSpotlights =
            Math.random() < 0.5 ? 2 : 3;

        const selectedMembers = getRandomMembers(
            eligibleMembers,
            numberOfSpotlights
        );

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error loading spotlights:", error);

        document.querySelector("#spotlights").innerHTML = `
            <p>
                Unable to load business spotlights.
            </p>
        `;
    }
}