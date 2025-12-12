// Global flag to track password existence status
var passwordExists = false;
// Track when an existence check is in flight so we don't clear UI prematurely
var passwordCheckPending = false;

$(document).ready(function() {
    var passwordCheckTimeout;
    var lastCheckedPassword = '';

    function triggerPasswordCheck() {
        var password = $('#passw').val().trim();
        var passwordError = $('#is-valid-password');

        // Clear any existing timeout
        clearTimeout(passwordCheckTimeout);

        // Do NOT reset passwordExists immediately; keep previous state until check resolves

        // Only check if password has minimum length for security checking
        // Align with strength/minimum rules used elsewhere (8+ characters)
        if (password.length >= 8) {
            // Only check existence if password is different from last checked
            if (password !== lastCheckedPassword) {
                // Set a timeout to delay the AJAX call until user stops typing
                passwordCheckTimeout = setTimeout(function() {
                    passwordCheckPending = true;
                    // Keep submit disabled while checking (prevents flicker)
                    $('.button-reg').prop('disabled', true);
                    $.ajax({
                        url: '../php/check_password.php',
                        type: 'POST',
                        dataType: 'json',
                        data: { password: password },
                        beforeSend: function() {
                            // Don't show "Checking..." message for security reasons
                            // Just continue with normal password strength validation
                        },
                        success: function(response) {
                            try {
                                var data = (typeof response === 'string') ? JSON.parse(response) : response;
                                if (data && data.exists) {
                                    passwordError.text('Password Already Exist');
                                    passwordError.css({'color': 'red', 'font-size': '11px'});
                                    passwordExists = true;
                                    // Prevent form submission immediately when duplicate is detected
                                    $('.button-reg').prop('disabled', true);
                                } else {
                                    passwordExists = false;
                                    // Clear any existing password existence message
                                    if (passwordError.text() === 'Password Already Exist') {
                                        passwordError.text('');
                                    }
                                    // Re-evaluate password strength and submit state when uniqueness is confirmed
                                    try {
                                        if (typeof updatePasswordStrength === 'function') {
                                            updatePasswordStrength(password, true);
                                        }
                                    } catch (e) {
                                        console.warn('Unable to update strength after uniqueness check:', e);
                                    }
                                }
                                passwordCheckPending = false;
                                lastCheckedPassword = password;
                            } catch (e) {
                                console.error("Error parsing JSON response:", e);
                                // Don't show error to user for security reasons
                                passwordExists = false;
                                passwordCheckPending = false;
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("AJAX request failed:", error);
                            // Don't show error to user for security reasons
                            passwordExists = false;
                            passwordCheckPending = false;
                        }
                    });
                }, 600); // Slightly faster response for UX
            }
        } else {
            // For short passwords, just reset the existence flag
            passwordExists = false;
            passwordCheckPending = false;
            lastCheckedPassword = '';
        }
    }

    // Listen on both password and confirm password fields for real-time feedback
    $('#passw').on('input', triggerPasswordCheck);
    $('#cpassword').on('input', triggerPasswordCheck);
    $('#passw').on('blur', triggerPasswordCheck);
    $('#cpassword').on('blur', triggerPasswordCheck);

    // Clear existence check when form is reset
    $('form').on('reset', function() {
        passwordExists = false;
        lastCheckedPassword = '';
        $('#is-valid-password').text('');
    });
});
