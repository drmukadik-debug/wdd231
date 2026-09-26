const membersUrl = "data/members.json";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

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

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

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
    const shuffled = [...members].sort(() => Math.random()- 0.5);
    return shuffled.slice(0, number);
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlights");

    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        
        card.className = "spotlight-card";
        
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

        const container =
            document.querySelector("#spotlights");

        if (container) {
            container.innerHTML = `
                <p> Unable to load business spotlights.</p>
        `;
        }
    }

}


getSpotlights();

const weatherApiKey = "8f343cc7b02944f98d6458b23e17b3db";
const latitude = -6.13603;
const longitude = 23.58979;

async function getWeather() {

    const currentWeather =
        document.querySelector("#current-weather");
    const forecast =
        document.querySelector("#forecast");
    try {

        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
        );

        if (!currentResponse.ok) {
            throw new Error(
                `Weather API error: ${currentResponse.status}`
            );
        }

        const currentData =
            await currentResponse.json();
        currentWeather.innerHTML = `
            <p>
                <strong>Temperature:</strong>
                ${Math.round(currentData.main.temp)}°C
            </p>

            <p>
                <strong>Conditions:</strong>
                ${currentData.weather[0].description}
            </p>
        `;

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
        );

        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast API error: ${forecastResponse.status}`
            );
        }

        const forecastData =
            await forecastResponse.json();

        displayForecast(forecastData.list);

    } catch (error) {

        console.error("Error loading weather:", error);

        currentWeather.innerHTML = `
            <p>
                Unable to load current weather.
            </p>
        `;

        forecast.innerHTML = `
            <p>
                Unable to load weather forecast.
            </p>
        `;
    }
}

function displayForecast(forecastList) {

    const forecastContainer =
        document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecast = {};

    forecastList.forEach((item) => {

        const date = new Date(item.dt * 1000);

        const dateKey =
            date.toISOString().split("T")[0];

        if (!dailyForecast[dateKey]) {
            dailyForecast[dateKey] = item;
        }
    });

    const days =
        Object.values(dailyForecast).slice(1, 4);

    days.forEach((day) => {

        const date =
            new Date(day.dt * 1000);

        const dayName =
            date.toLocaleDateString("en-US", {
                weekday: "long"
            });

        const temperature =
            Math.round(day.main.temp);

        const description =
            day.weather[0].description;

        const forecastCard =
            document.createElement("article");

        forecastCard.className =
            "forecast-card";

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>

            <p>
                <strong>${temperature}°C</strong>
            </p>

            <p>${description}</p>
        `;

        forecastContainer.appendChild(
            forecastCard
        );
    });
}

getWeather();
