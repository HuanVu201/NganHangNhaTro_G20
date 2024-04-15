
$(document).ready(function () {
    $('#Name').focus();
    $('#register-forms').submit(function (event) {
        event.preventDefault();
        var name = $('#Name').val();
        var password = $('#Password').val();
        var confirmPassword = $('#password-two').val();
        var phoneNumber = $('#PhoneNumber').val();
        var email = $('#Email').val();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var dropdown = document.getElementById("Gender");
        var selectedValue = dropdown.options[dropdown.selectedIndex].value;

        // Check if any field is empty
        if (name.trim() === '' && password.trim() === '' && confirmPassword.trim() === '' && phoneNumber.trim() === '' && email.trim() === '' && selectedValue === "") {
            $('#Name').focus();
            $('.error_null').show();
            return;
        } else {
            $('.error_null').hide();
        }
        // Check phone number format
        if (!/^\d{10,12}$/.test(phoneNumber)) {
            $('.error_phone').show();
            $('#PhoneNumber').focus();
            return;
        } else {
            $('.error_phone').hide();
        }
        // Check email format
        if (!emailPattern.test(email)) {
            $('.error_email').show();
            $('#Email').focus();
            return;
        } else {
            $('.error_email').hide();
        }

       // if (name.length < 8 && !name.includes('@')) {
         //   $('.error_name_lenght').show();
         //   return;
       // } else {
           // $('.error_name_lenght').hide();
       // }

       // if (name.includes('@')) {
        //    if (!emailPattern.test(name)) {
        //        $('#Name').focus();
        //        $('.error_email_name').show();
       //         return;
        //    } else {
        //        $('.error_email_name').hide();
        //    }
       // }
        
        // Check password length
        if (password.trim().length < 8) {
            $('.error_pass_one').show();
            $('#Password').focus();
            return;
        } else {
            $('.error_pass_one').hide();
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            $('.error_pass_two').show();
            $('#password-two').focus();
            return;
        } else {
            $('.error_pass_two').hide();
        }

        
        $('#register-forms').unbind('submit').submit();
    });
});
$("#close-register").click(function () {
    $(".fly").hide();
    $(".register-forms").hide();
});