// Global flag to track email existence status
var emailExists = false;

$(document).ready(function() {
    var emailCheckTimeout;
    var lastCheckedEmail = '';
    
    $('#email').on('input', function() {
        var email = $(this).val().trim();
        var emailError = $('#email_val');
        
        // Clear any existing timeout
        clearTimeout(emailCheckTimeout);

        // Reset existence status when input changes
        emailExists = false;

        // Basic email format validation
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        
        if (email.length > 0) {
            if (!emailPattern.test(email)) {
                emailError.text('Please enter a valid email format');
                emailError.css({'color': 'red', 'font-size': '13px'});
                emailExists = true;
                return;
            }

            // Only check existence if email is different from last checked
            if (email !== lastCheckedEmail) {
                // Set a timeout to delay the AJAX call until user stops typing
                emailCheckTimeout = setTimeout(function() {
                    $.ajax({
                        url: 'check_email.php',
                        type: 'GET',
                        data: { email: email },
                        beforeSend: function() {
                            emailError.text('Checking email...');
                            emailError.css({'color': 'blue', 'font-size': '13px'});
                        },
                        success: function(response) {
                            try {
                                var data = JSON.parse(response);
                                if (data.exists) {
                                    emailError.text('This email is already registered');
                                    emailError.css({'color': 'red', 'font-size': '13px'});
                                    emailExists = true;
                                } else {
                                    emailError.text('Email is available');
                                    emailError.css({'color': 'green', 'font-size': '13px'});
                                    emailExists = false;
                                    // Clear the message after 2 seconds
                                    setTimeout(function() {
                                        if ($('#email').val().trim() === email) {
                                            emailError.text('');
                                        }
                                    }, 2000);
                                }
                                lastCheckedEmail = email;
                            } catch (e) {
                                console.error("Error parsing JSON response:", e);
                                emailError.text('An error occurred. Please try again');
                                emailError.css({'color': 'red', 'font-size': '13px'});
                                emailExists = true;
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("AJAX request failed:", error);
                            emailError.text('Connection error. Please try again');
                            emailError.css({'color': 'red', 'font-size': '13px'});
                            emailExists = true;
                        }
                    });
                }, 500); // Wait 500ms after user stops typing
            }
        } else {
            emailError.text('');
            emailExists = false;
            lastCheckedEmail = '';
        }
    });

    // Clear existence check when form is reset
    $('form').on('reset', function() {
        emailExists = false;
        lastCheckedEmail = '';
        $('#email_val').text('');
    });
});

