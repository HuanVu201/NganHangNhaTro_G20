function validateRegistrationForm() {
    //check usename
    var username = document.getElementById('username');
    if (username.value.trim().length <= 14) {
        document.querySelector('.error_name').style.display = 'block';
        return false;
    } else {
        document.querySelector('.error_name').style.display = 'none';
    }

    // Check password
    var password1 = document.getElementById('password-one');
    if (password1.value.trim().length < 8) {
        document.querySelector('.error_pass_one').style.display = 'block';
        return false;
    } else {
        document.querySelector('.error_pass_one').style.display = 'none';
    }

    // Check password confirmation
    var password2 = document.getElementById('password-two');
    if (password1.value !== password2.value) {
        document.querySelector('.error_pass_two').style.display = 'block';
        return false;
    } else {
        document.querySelector('.error_pass_two').style.display = 'none';
    }

    // Check phone number format
    var phone = document.getElementById('phone');
    if (!/^\d{10,12}$/.test(phone.value)) {
        document.querySelector('.error_phone').style.display = 'block';
        return false;
    } else {
        document.querySelector('.error_phone').style.display = 'none';
    }

    // Check email format
    var email = document.getElementById('email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
        document.querySelector('.error_email').style.display = 'block';
        return false;
    } else {
        document.querySelector('.error_email').style.display = 'none';
    }
    return true;
}
