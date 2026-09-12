const container = document.querySelector("#courses-container");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(courseList) {

    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
            <p>${course.completed ? "✓ Completed" : "Not Completed"}</p>
            `;
        container.appendChild(card);
    });

    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
}

document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);