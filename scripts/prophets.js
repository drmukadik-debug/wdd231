const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    // Temporary testing
    console.table(data.prophets);

    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {

    prophets.forEach((prophet) => {

        // Create elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');

        // Build the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build the image
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute(
            'alt',
            `Portrait of ${prophet.name} ${prophet.lastname}`
        );
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add name and image to the card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Add additional information
        const birthdate = document.createElement('p');
        birthdate.textContent = `Birthdate: ${prophet.birthdate}`;

        const birthplace = document.createElement('p');
        birthplace.textContent = `Birthplace: ${prophet.birthplace}`;

        const death = document.createElement('p');
        death.textContent = `Death: ${prophet.death ?? 'Living'}`;

        const service = document.createElement('p');
        service.textContent = `Years as Prophet: ${prophet.length}`;

        const children = document.createElement('p');
        children.textContent = `Children: ${prophet.numofchildren}`;

        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(death);
        card.appendChild(service);
        card.appendChild(children);

        cards.appendChild(card);
    });
};

getProphetData();