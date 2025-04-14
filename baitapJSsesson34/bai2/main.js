const coursesPerPage = 5;
let courses = JSON.parse(localStorage.getItem("courses")) || [];
let currentPage = 1;

const renderCourses = (filteredCourses = courses) => {
    const courseList = document.getElementById("course-list");
    const pagination = document.getElementById("pagination");
    courseList.innerHTML = "";
    pagination.innerHTML = "";

    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(start, end);

    paginatedCourses.forEach((course, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true" class="editable">${course.name}</td>
            <td>${course.status}</td>
            <td>${course.startDate}</td>
            <td>
              <button onclick="deleteCourse(${start + index})">Delete</button>
            </td>
          `;

        row.querySelector(".editable").addEventListener("blur", (e) => {
            const newName = e.target.textContent.trim();
            if (newName) {
                courses[start + index].name = newName; 
                saveCourses(); 
            } else {
                e.target.textContent = courses[start + index].name;
                alert("Course name cannot be empty!");
            }
        });

        courseList.appendChild(row);
    });

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = i === currentPage ? "active" : "";
        button.addEventListener("click", () => {
            currentPage = i;
            renderCourses(filteredCourses);
        });
        pagination.appendChild(button);
    }
};

const saveCourses = () => {
    localStorage.setItem("courses", JSON.stringify(courses));
};

const deleteCourse = (index) => {
    courses.splice(index, 1);
    saveCourses();
    renderCourses();
};

const searchCourses = () => {
    const name = document.getElementById("search-name").value.toLowerCase();
    const status = document
        .getElementById("search-status")
        .value.toLowerCase();
    const date = document.getElementById("search-date").value;

    const filteredCourses = courses.filter((course) => {
        return (
            (!name || course.name.toLowerCase().includes(name)) &&
            (!status || course.status.toLowerCase().includes(status)) &&
            (!date || course.startDate === date)
        );
    });

    currentPage = 1;
    renderCourses(filteredCourses);
};

if (courses.length === 0) {
    courses = [
        { name: "HTML Basics", status: "Active", startDate: "2025-04-01" },
        {
            name: "CSS Fundamentals",
            status: "Completed",
            startDate: "2025-03-15",
        },
        {
            name: "JavaScript Essentials",
            status: "Active",
            startDate: "2025-04-10",
        },
        { name: "React Basics", status: "Planned", startDate: "2025-05-01" },
        { name: "Node.js Intro", status: "Active", startDate: "2025-04-20" },
        {
            name: "Python for Beginners",
            status: "Completed",
            startDate: "2025-03-01",
        },
        {
            name: "Data Structures",
            status: "Planned",
            startDate: "2025-06-01",
        },
    ];
    saveCourses();
}

renderCourses();