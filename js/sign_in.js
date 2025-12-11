// Sign In Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get the input elements
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="passw"]');
    const usernameValidation = document.getElementById('username_val');
    const passwordValidation = document.getElementById('password_val');

    // Function to validate input
    function validateInput(input, validationSpan, fieldName) {
        if (!input.value.trim()) {
            validationSpan.textContent = `Please input ${fieldName}`;
            input.style.borderColor = '#972532';
            return false;
        } else {
            validationSpan.textContent = '';
            input.style.borderColor = '#ced4da';
            return true;
        }
    }

    // Add event listeners for real-time validation
    if (usernameInput && usernameValidation) {
        usernameInput.addEventListener('input', function() {
            validateInput(this, usernameValidation, 'Username');
        });

        usernameInput.addEventListener('blur', function() {
            validateInput(this, usernameValidation, 'Username');
        });
    }

    if (passwordInput && passwordValidation) {
        passwordInput.addEventListener('input', function() {
            validateInput(this, passwordValidation, 'Password');
        });

        passwordInput.addEventListener('blur', function() {
            validateInput(this, passwordValidation, 'Password');
        });
    }

    // Update the form submission validation
    function loginValidation() {
        const isUsernameValid = usernameInput && usernameValidation ? 
            validateInput(usernameInput, usernameValidation, 'Username') : true;
        const isPasswordValid = passwordInput && passwordValidation ? 
            validateInput(passwordInput, passwordValidation, 'Password') : true;
        return isUsernameValid && isPasswordValid;
    }

    // Make loginValidation available globally for form onsubmit
    window.loginValidation = loginValidation;
});

