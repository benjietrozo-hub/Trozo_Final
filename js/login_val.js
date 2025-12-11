function validateUsername() {
    var username = document.getElementById("username").value;
    
    if (username.length < 4 || username.length > 15) {
        document.getElementById("username_val").innerHTML = "You need to input a username with at least 4 and at most 15 characters!";
        document.getElementById("username_val").style.fontSize = "13px";
        return false;
    } else {
        document.getElementById("username_val").innerHTML = "";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordVal = document.getElementById("password_val");

    // Check length
    if (password.length < 8 || password.length > 15) {
        passwordVal.innerHTML = "You need to input a password with at least 8 and at most 15 characters!";
        passwordVal.style.fontSize = "13px";
        return false; // Return false if invalid
    }

    // Check for spaces
    if (/\s/.test(password)) {
        passwordVal.innerHTML = "Password must not contain spaces!";
        passwordVal.style.fontSize = "13px";
        return false; // Return false if invalid
    }

    // Check for at least one uppercase letter, one number, and one special character
    var uppercaseRegex = /[A-Z]/;
    var numberRegex = /[0-9]/;
    var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!uppercaseRegex.test(password)) {
        passwordVal.innerHTML = "Password must contain at least one uppercase letter!";
        passwordVal.style.fontSize = "13px";
        return false; // Return false if invalid
    }

    if (!numberRegex.test(password)) {
        passwordVal.innerHTML = "Password must contain at least one number!";
        passwordVal.style.fontSize = "13px";
        return false; // Return false if invalid
    }

    if (!specialCharRegex.test(password)) {
        passwordVal.innerHTML = "Password must contain at least one special character!";
        passwordVal.style.fontSize = "13px";
        return false; // Return false if invalid
    }

    passwordVal.innerHTML = ""; // Clear error message when valid
    return true; // Return true if valid
}

function loginValidation() {
    var isUsernameValid = validateUsername();
    var isPasswordValid = validatePassword();

    // Prevent submission if either validation fails
    return isUsernameValid && isPasswordValid;
}

// Remove duplicate username validation event listener since it's handled in usernamecheck.js

// for (let i = 0; i < 100; i++) {
//     window.history.pushState(null, null, window.location.href);
// }

// function destroyHistory() {
//     // Initially push 100 states
//     for (let i = 0; i < 100; i++) {
//         window.history.pushState(null, null, window.location.href);
//     }

//     // Continuously push the current state into the history every 100 milliseconds
//     setInterval(function() {
//         window.history.pushState(null, null, window.location.href);
//     }, 100);  // Adjust the interval as needed
    
//     // Capture the popstate event and prevent back navigation
//     window.onpopstate = function() {
//         window.history.pushState(null, null, window.location.href);  // Re-push the state to block back navigation
//     };
// }
