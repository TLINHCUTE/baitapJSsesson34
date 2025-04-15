const courses = [
    {
        id: 1,
        content: 'Learn Javascript Session 01',
        dueDate: '2023-04-17',
        status: 'Pending',
        assignedTo: 'Anh Bách',
    },
    {
        id: 2,
        content: 'Learn Javascript Session 2',
        dueDate: '2023-04-17',
        status: 'Pending',
        assignedTo: 'Lâm th`',
    },
    {
        id: 3,
        content: 'Learn CSS Session 1',
        dueDate: '2023-04-17',
        status: 'Pending',
        assignedTo: 'Hiếu Cí Ớt Ớt',
    },
];
function displayCourses(filteredCourses = courses) {
    const tableBody = document.getElementById('course-list');
    tableBody.innerHTML = '';

    filteredCourses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${course.content}</td>
        <td>${course.dueDate}</td>
        <td>${course.status}</td>
        <td>${course.assignedTo}</td>
        <td>
        <button onclick="deleteCourse(${course.id})">Delete</button>
        <button onclick="editCourse(${course.id})">Edit</button>
        </td>
      `;
        tableBody.appendChild(row);
    });
}

function searchCourses() {
    const contentSearch = document.getElementById('content').value.toLowerCase();
    const dateSearch = document.getElementById('search-date').value;
    const statusSearch = document.getElementById('choose-status').value;

    const filteredCourses = courses.filter(course =>
        (course.content.toLowerCase().includes(contentSearch) || contentSearch === '') &&
        (course.dueDate === dateSearch || dateSearch === '') &&
        (course.status === statusSearch || statusSearch === '')
    );

    displayCourses(filteredCourses);
}


function deleteCourse(id) {
    const index = courses.findIndex(course => course.id === id);
    if (index !== -1) {
        courses.splice(index, 1);
        displayCourses();
    }
}
function addCourse() {
    const content = document.getElementById('content').value;
    const dueDate = document.getElementById('search-date').value;
    const status = document.getElementById('choose-status').value;
    const assignedTo = document.getElementById('username').value;

    if (content && dueDate && status && assignedTo) {
        const newCourse = {
            id: courses.length + 1,
            content,
            dueDate,
            status,
            assignedTo
        };

        courses.push(newCourse);
        displayCourses();
    } else {
        alert('Please fill all fields');
    }
}
function editCourse(id) {
    const course = courses.find(course => course.id === id);
    if (course) {
        document.getElementById('content').value = course.content;
        document.getElementById('search-date').value = course.dueDate;
        document.getElementById('choose-status').value = course.status;
        document.getElementById('username').value = course.assignedTo;

        document.getElementById('course-id').value = id;
    }
}


window.onload = displayCourses;