let accounts = JSON.parse(localStorage.getItem("users")) || [];

function clearErrors() {
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    if (emailError) emailError.style.display = "none";
    if (passwordError) passwordError.style.display = "none";
    if (emailInput) emailInput.classList.remove("valid", "invalid");
    if (passwordInput) passwordInput.classList.remove("valid", "invalid");
}

function validateLogin(event) {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;
    let isValid = true;

    clearErrors();

    if (!email) {
        document.getElementById("emailError").textContent = "Vui lòng nhập email.";
        document.getElementById("emailError").style.display = "block";
        document.getElementById("email").classList.add("invalid");
        isValid = false;
    }

    if (!password) {
        document.getElementById("passwordError").textContent = "Vui lòng nhập mật khẩu.";
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("password").classList.add("invalid");
        isValid = false;
    }

    if (isValid) {
        let account = accounts.find(acc => acc.email === email && acc.password === password);
        if (!account) {
            document.getElementById("passwordError").textContent = "Email hoặc mật khẩu không chính xác.";
            document.getElementById("passwordError").style.display = "block";
            document.getElementById("email").classList.add("invalid");
            document.getElementById("password").classList.add("invalid");
            isValid = false;
        }
    }

    if (isValid) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html"; 
    }

    return isValid;
}
