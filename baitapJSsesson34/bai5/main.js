document.addEventListener("DOMContentLoaded", loadEmployees);

function addEmployee() {
    let name = document.getElementById("name").value;
    let position = document.getElementById("position").value;

    if (!name || !position) {
        alert("Vui lòng nhập đầy đủ thông tin nhân viên!");
        return;
    }

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees.push({ name, position });
    localStorage.setItem("employees", JSON.stringify(employees));

    loadEmployees();
}

function loadEmployees() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let employeeList = document.getElementById("employeeList");

    employeeList.innerHTML = "";
    employees.forEach((employee, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
        </tr>`;
        employeeList.innerHTML += row;
    });
}
