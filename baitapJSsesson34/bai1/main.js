function validateRegistration(email, password, check) {
    if (!email || !password || !check) {
        alert('Không được bỏ trống.');
        return false;
    }

    if (password !== check) {
        alert('Mật khẩu không khớp. Vui lòng thử lại.');
        return false;
    }

    if (emailExists(email)) {
        alert('Email này đã được đăng ký. Vui lòng sử dụng email khác.');
        return false;
    }

    return true;
}
function emailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
}

document.querySelector('button').addEventListener('click', () => {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const confirmPassword = document.getElementById('inputCheck').value;

    if (validateRegistration(email, password, confirmPassword)) {
        registerUser(email, password);
    }
});
