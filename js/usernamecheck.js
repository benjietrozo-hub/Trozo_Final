// Global flag to track username existence status
var usernameExists = false;

$(document).ready(function() {
    var usernameCheckTimeout;
    var lastCheckedUsername = '';
    
    $('#username').on('input', function() {
        var username = $(this).val().trim();
        var usernameError = $('#username_val');
        
        // Clear any existing timeout
        clearTimeout(usernameCheckTimeout);

        // Reset existence status when input changes
        usernameExists = false;

        // Basic username validation
        var usernamePattern = /^[a-zA-Z0-9._]+$/;
        
        if (username.length > 0) {
            // Validate username format first
            if (!usernamePattern.test(username)) {
                usernameError.text('Username can only contain letters, numbers, dots, and underscores');
                usernameError.css({'color': 'red', 'font-size': '13px'});
                usernameExists = true;
                return;
            }

            // Check username length
            if (username.length < 4) {
                usernameError.text('Username must be at least 4 characters long');
                usernameError.css({'color': 'blue', 'font-size': '13px'});
                usernameExists = true;
                return;
            }

            if (username.length > 15) {
                usernameError.text('Username cannot exceed 15 characters');
                usernameError.css({'color': 'red', 'font-size': '13px'});
                usernameExists = true;
                return;
            }

            // Only check existence if username is different from last checked
            if (username !== lastCheckedUsername) {
                // Set a timeout to delay the AJAX call until user stops typing
                usernameCheckTimeout = setTimeout(function() {
                    $.ajax({
                        url: 'check_username.php',
                        type: 'GET',
                        data: { username: username },
                        beforeSend: function() {
                            usernameError.text('Checking username...');
                            usernameError.css({'color': 'blue', 'font-size': '13px'});
                        },
                        success: function(response) {
                            try {
                                var data = JSON.parse(response);
                                if (data.exists) {
                                    usernameError.text('This username is already registered');
                                    usernameError.css({'color': 'red', 'font-size': '13px'});
                                    usernameExists = true;
                                } else {
                                    usernameError.text('Username is available');
                                    usernameError.css({'color': 'green', 'font-size': '13px'});
                                    usernameExists = false;
                                    // Clear the message after 2 seconds
                                    setTimeout(function() {
                                        if ($('#username').val().trim() === username) {
                                            usernameError.text('');
                                        }
                                    }, 2000);
                                }
                                lastCheckedUsername = username;
                            } catch (e) {
                                console.error("Error parsing JSON response:", e);
                                usernameError.text('An error occurred. Please try again');
                                usernameError.css({'color': 'red', 'font-size': '13px'});
                                usernameExists = true;
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("AJAX request failed:", error);
                            usernameError.text('Connection error. Please try again');
                            usernameError.css({'color': 'red', 'font-size': '13px'});
                            usernameExists = true;
                        }
                    });
                }, 500); // Wait 500ms after user stops typing
            }
        } else {
            usernameError.text('');
            usernameExists = false;
            lastCheckedUsername = '';
        }
    });

    // Prevent spaces in username
    $('#username').on('keypress', function(e) {
        if (e.which === 32) { // Space character
            e.preventDefault();
            return false;
        }
    });

    // Handle paste events for username
    $('#username').on('paste', function(e) {
        e.preventDefault();
        var pastedData = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
        
        // Remove spaces and invalid characters
        var cleaned = pastedData.replace(/[^a-zA-Z0-9._]/g, '');
        
        // Insert at cursor position
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var currentValue = $(this).val();
        var newValue = currentValue.substring(0, start) + cleaned + currentValue.substring(end);
        
        // Ensure max length
        if (newValue.length > 15) {
            newValue = newValue.substring(0, 15);
        }
        
        $(this).val(newValue);
    });

    // Clear existence check when form is reset
    $('form').on('reset', function() {
        usernameExists = false;
        lastCheckedUsername = '';
        $('#username_val').text('');
    });
});


