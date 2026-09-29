const container = document.querySelector("#courses-container");
const totalCredits = document.querySelector("#total-credits");
const courseDetails = document.querySelector("#course-details");


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

        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });
        
        container.appendChild(card);
    });

    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
}

/* Course Filters*/

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

/* Course Modal*/

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="close course details">
            ❌
        </button>
        
        <h2>${course.subject} ${course.number}</h2>
        
        <h3>${course.title}</h3>
       
        <p>
            <strong>Credits:</strong>
            ${course.credits}
        </p>
        
        <p>
            <strong>Certificate:</strong>
            ${course.certificate}
        </p>
        
        <p>
            ${course.description}
        </p>
        
        <p>
            <strong>Technologies:</strong>
            ${course.technology.join(", ")}
        </p>
    `;

    courseDetails.showModal();
    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

courseDetails.addEventListener("click", (event) => {

    if (event.target === courseDetails) {
        courseDetails.close();
    }

});