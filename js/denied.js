// Denied Page JavaScript

function disableElements() {
    // Get timerActive from global variable set by PHP or from hidden input
    var timerActive = typeof timeIncrement !== 'undefined' ? timeIncrement : 
        (document.getElementById('timeIncrement') ? 
        (parseFloat(document.getElementById('timeIncrement').value) > 0) : false);
    var navbar = document.querySelector('nav.navbar');
    var loginCard = document.querySelector('.card.shadow-lg');
    var allLinks = document.querySelectorAll('a');
    var navbarLinks = document.querySelectorAll('.navbar .nav-link');
    var navbarItems = document.querySelectorAll('.navbar .nav-item');
    var loginButton = document.querySelector('button[type="submit"]');

    if (timerActive) {
        // Apply not-allowed cursor and disable interactions on navbar and login card
        if (navbar) {
            navbar.style.cursor = 'not-allowed';
        }
        if (loginCard) {
            loginCard.style.cursor = 'not-allowed';

            // Disable all interactive elements inside the card
            var controls = loginCard.querySelectorAll('input, select, textarea, button, a');
            controls.forEach(function (el) {
                if (el.tagName.toLowerCase() === 'a') {
                    el.style.pointerEvents = 'none';
                } else {
                    el.disabled = true;
                }
                el.style.cursor = 'not-allowed';
            });
        }

        // Disable all navbar links (Home, Register, etc.) and remove hover effect
        if (navbarLinks && navbarLinks.length) {
            navbarLinks.forEach(function (link) {
                link.style.pointerEvents = 'none';
                link.style.cursor = 'not-allowed';
                // Force a fixed disabled color so :hover does not visually change it
                link.style.setProperty('color', 'gray', 'important');
                link.style.setProperty('text-decoration', 'none', 'important');
                link.style.setProperty('background-color', 'transparent', 'important');
            });
        }

        // Also disable hover/background on the nav-item containers
        if (navbarItems && navbarItems.length) {
            navbarItems.forEach(function (item) {
                item.style.pointerEvents = 'none';
                item.style.cursor = 'not-allowed';
                item.style.setProperty('background-color', 'transparent', 'important');
            });
        }

        // Also ensure any other links on the page are not clickable
        if (allLinks && allLinks.length) {
            allLinks.forEach(function (link) {
                link.style.pointerEvents = 'none';
                link.style.cursor = 'not-allowed';
            });
        }

        // Explicitly disable the LOGIN button and remove hover/interaction
        if (loginButton) {
            loginButton.disabled = true;
            loginButton.style.cursor = 'not-allowed';
            loginButton.style.pointerEvents = 'none';
        }

        // Block back button
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            if (timerActive) {
                window.history.pushState(null, "", window.location.href);
                alert("You cannot go back while the timer is active.");
            }
        };
    }
}

window.onload = disableElements;

