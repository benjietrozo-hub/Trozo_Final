// Global flag to track ID existence status
var idNumberExists = false;

$(document).ready(function () {
    var idCheckTimeout;
    
    $('#idnumber').on('input', function () {
        var idnumber = $(this).val().trim();
        var idError = $('#idnumber_val');
        
        // Clear any existing timeout
        clearTimeout(idCheckTimeout);

        // Basic format validation (any four digits, hyphen, four digits)
        var idPattern = /^\d{4}-\d{4}$/;
        
        if (idnumber.length > 0) {
            // Remove any additional hyphens (keep only the first one)
            if ((idnumber.match(/-/g) || []).length > 1) {
                idnumber = idnumber.replace(/-/g, function(match, offset, string) {
                    // Keep only the first hyphen
                    return string.indexOf('-') === offset ? match : '';
                });
                $(this).val(idnumber);
            }
            
            // Show different messages based on input state
            if (!idPattern.test(idnumber)) {
                if (idnumber.length >= 9) {
                    idError.text('Format should be: xxxx-xxxx (e.g., 2023-1234)');
                    idError.css({'color': 'red', 'font-size': '13px'});
                } else {
                    idError.text('Please enter a valid ID number format: xxxx-xxxx');
                    idError.css({'color': 'blue', 'font-size': '13px'});
                }
                idNumberExists = true;
                return;
            }

            // Additional year validation (optional warning)
            var yearPart = parseInt(idnumber.split('-')[0]);
            var currentYear = new Date().getFullYear();
            if (yearPart < 2000 || yearPart > currentYear) {
                idError.text('Warning: Year part seems unusual. Please verify.');
                idError.css({'color': '#ff8c00', 'font-size': '13px'}); // Orange warning
                // Don't return - allow the check to continue
            }

            // Set a timeout to delay the AJAX call until user stops typing
            idCheckTimeout = setTimeout(function() {
                $.ajax({
                    url: 'check_id_number.php',
                    type: 'GET',
                    data: { idnumber: idnumber },
                    beforeSend: function() {
                        idError.text('Checking ID number...');
                        idError.css({'color': 'blue', 'font-size': '13px'});
                    },
                    success: function (response) {
                        try {
                            var data = JSON.parse(response);
                            if (data.exists) {
                                idError.text('This ID number is already registered');
                                idError.css({'color': 'red', 'font-size': '13px'});
                                idNumberExists = true;
                            } else {
                                idError.text('ID number is available');
                                idError.css({'color': 'green', 'font-size': '13px'});
                                idNumberExists = false;
                                // Clear the message after 2 seconds
                                setTimeout(function() {
                                    idError.text('');
                                }, 2000);
                            }
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                            idError.text('An error occurred. Please try again');
                            idError.css({'color': 'red', 'font-size': '13px'});
                            idNumberExists = true;
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX request failed:", error);
                        idError.text('Connection error. Please try again');
                        idError.css({'color': 'red', 'font-size': '13px'});
                        idNumberExists = true;
                    }
                });
            }, 500); // Wait 500ms after user stops typing
        } else {
            idError.text('');
            idNumberExists = false;
        }
    });

    // Allow numbers and one hyphen with flexible positioning
    $('#idnumber').on('keypress', function(e) {
        var char = String.fromCharCode(e.which);
        var currentValue = $(this).val();
        
        // Allow backspace and arrow keys
        if (e.which === 8 || e.which === 37 || e.which === 39) {
            return true;
        }
        
        // Allow only numbers and one hyphen
        if (!/[\d-]/.test(char)) {
            e.preventDefault();
            return false;
        }
        
        // Handle hyphen
        if (char === '-') {
            // Allow only one hyphen
            if (currentValue.includes('-')) {
                e.preventDefault();
                return false;
            }
            // Don't allow hyphen as first character
            if (currentValue.length === 0) {
                e.preventDefault();
                return false;
            }
        }
        
        // Prevent more than 9 characters total (xxxx-xxxx)
        if (currentValue.length >= 9) {
            e.preventDefault();
            return false;
        }
    });

    // Handle paste events
    $('#idnumber').on('paste', function(e) {
        e.preventDefault();
        var pastedData = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
        
        // Clean the pasted data
        var cleaned = pastedData.replace(/[^\d-]/g, ''); // Remove anything that's not a digit or hyphen
        cleaned = cleaned.replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
        
        // Ensure proper format
        if (cleaned.length > 9) {
            cleaned = cleaned.substring(0, 9);
        }
        
        // Insert at cursor position
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var currentValue = $(this).val();
        var newValue = currentValue.substring(0, start) + cleaned + currentValue.substring(end);
        
        // Clean up the final value
        newValue = newValue.replace(/[^\d-]/g, '').substring(0, 9);
        $(this).val(newValue);
    });
});
