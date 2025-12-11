var disableTimer = false;
var timerId = null; // Variable to store the timer ID so we can stop it
var isResetting = false; // Flag to stop the loop from writing to storage

// 1. EVENT LISTENER FOR RESET
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        console.log("Developer Reset Activated.");
        
        // A. IMMEDIATELY STOP THE TIMER LOOP
        isResetting = true; 
        if (timerId) clearTimeout(timerId);

        // B. Clear client-side timer storage
        localStorage.removeItem('count_timer');

        // C. Call reset endpoint
        fetch("reset_dev.php?reset_all_dev=1", { 
            method: "GET", 
            credentials: "same-origin" 
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                // Ensure storage is gone one last time before reload
                localStorage.removeItem('count_timer'); 
                alert("System Reset Successful. Redirecting...");
                window.location.href = "Sign_in.php";
            } else {
                alert("Developer reset failed: " + (data.message || "Unknown error"));
                // If it failed, reload anyway to reset state
                window.location.href = "Sign_in.php";
            }
        })
        .catch(err => {
            console.error("Reset failed:", err);
            localStorage.removeItem('count_timer');
            window.location.href = "Sign_in.php";
        });
    }
});

// 2. CHECK EXISTING LOCKOUT ON LOAD
(function () {
    try {
        if (!disableTimer) {
            var stored = localStorage.getItem('count_timer');
            // Only redirect if we have time left AND we are not already on denied.php
            if (stored && parseInt(stored, 10) > 0 && !window.location.href.includes('denied.php')) {
                // Determine if we need to go to denied.php
                // Usually Sign_in.php handles this, but this is a safety check
            }
        }
    } catch (e) {}
})();

// 3. MAIN TIMER LOGIC
if (!disableTimer) {
    
    // Attempt to get the increment value (hidden input from PHP)
    var incrementEl = document.getElementById("timeIncrement");
    var timeIncrementValue = parseFloat(incrementEl ? incrementEl.value : '0');

    var count_timer;

    // Initialize or restore
    if (localStorage.getItem("count_timer")) {
        count_timer = parseInt(localStorage.getItem("count_timer"), 10);
    } else {
        // Logic for setting time based on batch
        if (timeIncrementValue <= 0.5) count_timer = 15;
        else if (timeIncrementValue <= 1) count_timer = 30;
        else if (timeIncrementValue <= 2) count_timer = 60;
        else count_timer = 900;

        // Only save if we actually have a reason to lock (value > 0)
        // Checks if element exists to avoid setting timer on pages without the lock logic
        if(document.getElementById("total-time-left")) {
             localStorage.setItem("count_timer", count_timer);
        }
    }

    var displayElement = document.getElementById("total-time-left");

    // Block Back Button Logic
    if (displayElement && count_timer > 0) {
        history.pushState(null, document.title, location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, document.title, location.href);
            location.reload();
        });
    }

    function countDownTimer() {
        // STOP EXECUTION IF RESETTING
        if (isResetting) return; 

        var minutes = parseInt(count_timer / 60);
        var seconds = parseInt(count_timer % 60);

        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;

        if (displayElement) {
            displayElement.innerHTML = " Please wait for " + minutes + " Minutes " + seconds + " Seconds";
        }

        if (count_timer <= 0) {
            localStorage.removeItem("count_timer");
            if (timeIncrementValue > 2) {
                window.location.href = "Sign_in.php?reset_lock=1";
            } else {
                window.location.href = "Sign_in.php";
            }
        } else {
            count_timer = count_timer - 1;
            
            // Only save to storage if we are NOT in the middle of a reset
            if (!isResetting) {
                localStorage.setItem("count_timer", count_timer);
                // Assign the timeout to a variable so we can clear it later
                timerId = setTimeout(countDownTimer, 1000);
            }
        }
    }

    // Only start timer if the display element exists (meaning we are on denied.php)
    if (displayElement && count_timer > 0) {
        timerId = setTimeout(countDownTimer, 1000);
    }
}