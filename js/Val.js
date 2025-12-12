document.addEventListener('DOMContentLoaded', function() {
    // Required Fields Definition - organized by row for left-to-right validation
    const requiredFieldsByRow = [
        // First row
        [
            { id: 'idnumber', name: 'ID Number', errorId: 'idnumber_val' },
            { id: 'firstname', name: 'First Name', errorId: 'firstnamee' },
            { id: 'lastname', name: 'Last Name', errorId: 'lastnamee' }
        ],
        // Second row
        [
            { id: 'sex', name: 'Sex', errorId: 'sex_val' },
            { id: 'birthdate', name: 'Birthdate', errorId: 'birthdate_val' }
        ],
        // Address row
        [
            { id: 'street', name: 'Street/Purok', errorId: 'street_val' },
            { id: 'barangay', name: 'Barangay', errorId: 'barangay_val' },
            { id: 'municipality', name: 'Municipality', errorId: 'municipality_val' }
        ],
        // Address row 2
        [
            { id: 'province', name: 'Province', errorId: 'province_val' },
            { id: 'country', name: 'Country', errorId: 'country_val' },
            { id: 'postal', name: 'Postal Code', errorId: 'postal_val' }
        ],
        // Account row
        [
            { id: 'email', name: 'Email', errorId: 'email_val' },
            { id: 'username', name: 'Username', errorId: 'username_val' },
            { id: 'passw', name: 'Password', errorId: 'is-valid-password' },
            { id: 'cpassword', name: 'Confirm Password', errorId: 'is-valid-confirmpassword' }
        ]
    ];

    // Flatten the array for other operations
    const requiredFields = requiredFieldsByRow.flat();

    // Helper function to validate individual fields
    function validateField(fieldId, fieldName, errorId) {
        const element = document.getElementById(fieldId);
        const errorSpan = document.getElementById(errorId);
        let isValid = true;

        if (!element || !element.value.trim()) {
            if (errorSpan && element === document.activeElement) {
                errorSpan.innerHTML = `<span style="color: red">✗ ${fieldName} is required!</span>`;
                errorSpan.style.fontSize = "13px";
            }
            isValid = false;
        } else {
            // Additional field-specific validation
            switch (fieldId) {
                case 'idnumber':
                    isValid = validateIdNumber(element.value);
                    break;
                case 'firstname':
                case 'lastname':
                    isValid = validateName(element.value, errorId);
                    break;
                case 'email':
                    isValid = validateEmail(element.value);
                    break;
                case 'passw':
                    const strengthResult = checkPasswordStrength(element.value);
                    isValid = strengthResult.isValid;
                    break;
                case 'postal':
                    isValid = validatePostal(element.value);
                    break;
                case 'username':
                    isValid = validateUsername(element.value);
                    break;
                case 'street':
                    isValid = validateStreet(element.value);
                    break;
                case 'barangay':
                    isValid = validateBarangay(element.value);
                    break;
                case 'municipality':
                case 'province':
                case 'country':
                    isValid = validateLettersOnly(element.value, errorId);
                    break;
            }
        }

        return isValid;
    }

    // Clear all error messages
    function clearAllErrors() {
        requiredFields.forEach(field => {
            const errorSpan = document.getElementById(field.errorId);
            if (errorSpan) {
                errorSpan.textContent = "";
            }
        });
    }

    // Add real-time validation listeners for each required field
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.addEventListener('input', function() {
                validateField(field.id, field.name, field.errorId);
            });

            element.addEventListener('blur', function() {
                validateField(field.id, field.name, field.errorId);
            });
        }
    });

    // Add specific validation for password
    const passwordInput = document.getElementById('passw');
    const confirmPasswordInput = document.getElementById('cpassword');
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch();
        });
    }

    // Main form validation function
    function formValidation() {
        let hasError = false;
        const errorFields = [];

        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField(field.id, field.name, field.errorId)) {
                hasError = true;
                errorFields.push(field.name);
            }
        });

        // Check for existence flags
        if (typeof usernameExists !== 'undefined' && usernameExists) {
            hasError = true;
        }
        if (typeof emailExists !== 'undefined' && emailExists) {
            hasError = true;
        }
        if (typeof idNumberExists !== 'undefined' && idNumberExists) {
            hasError = true;
        }
        if (typeof passwordExists !== 'undefined' && passwordExists) {
            hasError = true;
        }

        // Additional validations
        if (!validatePasswordMatch()) {
            hasError = true;
        }

        if (hasError) {
            if (errorFields.length > 0) {
                alert("Please fill in all required fields and fix any errors before submitting.\nMissing fields: " + errorFields.join(", "));
            } else {
                alert("Please fix all errors before submitting the form.");
            }
            return false;
        }

        return true;
    }

    // Single, unified form submission handler
    const form = document.getElementById('registrationForm');
    if (!form) {
        console.error('Registration form not found!');
        return;
    }

    form.onsubmit = function(e) {
        // Initially prevent the form submission
        e.preventDefault();
        let hasError = false;

        // Clear all previous error messages
        clearAllErrors();

        // Check all existence flags
        if (typeof idNumberExists !== 'undefined' && idNumberExists) {
            const idError = document.getElementById('idnumber_val');
            idError.innerHTML = '<span style="color: red">✗ This ID number already exists</span>';
            idError.style.fontSize = '13px';
            hasError = true;
        }

        if (typeof emailExists !== 'undefined' && emailExists) {
            const emailError = document.getElementById('email_val');
            emailError.innerHTML = '<span style="color: red">✗ This email is already registered</span>';
            emailError.style.fontSize = '13px';
            hasError = true;
        }

        if (typeof usernameExists !== 'undefined' && usernameExists) {
            const usernameError = document.getElementById('username_val');
            usernameError.innerHTML = '<span style="color: red">✗ This username is already taken</span>';
            usernameError.style.fontSize = '13px';
            hasError = true;
        }

        // Run field validations
        for (const row of requiredFieldsByRow) {
            for (const field of row) {
                const element = document.getElementById(field.id);
                const errorSpan = document.getElementById(field.errorId);
                
                if (!element || !element.value.trim()) {
                    if (errorSpan) {
                        errorSpan.innerHTML = `<span style="color: red">✗ ${field.name} is required!</span>`;
                        errorSpan.style.fontSize = "13px";
                    }
                    if (element) {
                        element.focus();
                    }
                    hasError = true;
                    break;
                }
                
                // Validate field format
                if (!validateField(field.id, field.name, field.errorId)) {
                    if (element) {
                        element.focus();
                    }
                    hasError = true;
                    break;
                }
            }
            if (hasError) break;
        }

        // Check password match and strength
        const password = document.getElementById('passw').value;
        const confirmPassword = document.getElementById('cpassword').value;
        
        if (password !== confirmPassword) {
            const errorSpan = document.getElementById('is-valid-confirmpassword');
            errorSpan.innerHTML = '<span style="color: red">✗ Passwords do not match</span>';
            hasError = true;
        }

        const strengthResult = checkPasswordStrength(password);
        if (!strengthResult.isValid) {
            hasError = true;
        }

        // If there are no errors, allow the form to submit
        if (!hasError) {
            console.log("Form is valid, submitting...");
            return true; // Allow the form to submit naturally
        } else {
            console.log("Form has errors, not submitting");
            return false; // Prevent form submission
        }
    };

    // Remove any duplicate event listeners
    form.removeEventListener('submit', form.onsubmit);

    // Add birthdate validation and age calculation
    const birthdateInput = document.getElementById("birthdate");
    if (birthdateInput) {
        birthdateInput.addEventListener("change", function() {
            const birthdate = this.value;
            const ageField = document.getElementById("age");
            const ageValidationMessage = document.getElementById("age_val");
            const submitButton = document.querySelector(".button-reg");

            if (birthdate) {
                const birthDateObj = new Date(birthdate);
                const today = new Date();

                // Calculate age
                let age = today.getFullYear() - birthDateObj.getFullYear();
                const monthDiff = today.getMonth() - birthDateObj.getMonth();
                
                // Adjust age if birthday hasn't occurred this year
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                    age--;
                }

                // Update age field if it exists
                if (ageField) {
                    ageField.value = age;
                }

                // Validate age and show message
                if (ageValidationMessage) {
                    if (age < 18) {
                        ageValidationMessage.innerHTML = '<span style="color: red">✗ Age must be 18 or above</span>';
                        ageValidationMessage.style.fontSize = "13px";
                        if (submitButton) {
                            submitButton.disabled = true;
                        }
                    } else {
                        ageValidationMessage.innerHTML = '<span style="color: green">✓ Age verified</span>';
                        if (submitButton) {
                            submitButton.disabled = false;
                        }
                    }
                }
            } else {
                // Clear age field if birthdate is invalid
                if (ageField) {
                    ageField.value = "";
                }
                if (ageValidationMessage) {
                    ageValidationMessage.innerHTML = '<span style="color: red">✗ Please enter a valid birthdate</span>';
                    ageValidationMessage.style.fontSize = "13px";
                }
                if (submitButton) {
                    submitButton.disabled = true;
                }
            }
        });
    }

    // Ensure the form is using the validation
    if (form) {
        form.onsubmit = function(e) {
            console.log("Form submission attempted"); // Debug log
            const isValid = formValidation();
            console.log("Validation result:", isValid); // Debug log
            if (!isValid) {
                e.preventDefault();
                return false;
            }
            return true;
        };
    } else {
        console.error("Registration form not found!"); // Debug log
    }

    // Enforce numeric-only 4-digit postal/ZIP code
    const postalInput = document.getElementById('postal');
    if (postalInput) {
        postalInput.addEventListener('input', function () {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            // Limit to 4 characters
            if (value.length > 4) {
                value = value.slice(0, 4);
            }
            this.value = value;
        });
    }

    // Add password toggle functionality
    const togglePasswordBtn = document.getElementById('togglePassword');
    const togglePasswordIcon = document.getElementById('togglePasswordIcon');
    const passwordField = document.getElementById('passw');

    if (togglePasswordBtn && passwordField) {
        togglePasswordBtn.addEventListener('click', function() {
            // Toggle the type attribute
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Toggle the icon
            togglePasswordIcon.classList.toggle('fa-eye');
            togglePasswordIcon.classList.toggle('fa-eye-slash');
        });
    }

    // Toggle for confirm password
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const toggleConfirmPasswordIcon = document.getElementById('toggleConfirmPasswordIcon');
    const confirmPasswordField = document.getElementById('cpassword');

    if (toggleConfirmPasswordBtn && confirmPasswordField) {
        toggleConfirmPasswordBtn.addEventListener('click', function() {
            // Toggle the type attribute
            const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordField.setAttribute('type', type);
            
            // Toggle the icon
            toggleConfirmPasswordIcon.classList.toggle('fa-eye');
            toggleConfirmPasswordIcon.classList.toggle('fa-eye-slash');
        });
    }

    // Prevent the form from submitting when clicking the toggle buttons
    [togglePasswordBtn, toggleConfirmPasswordBtn].forEach(button => {
        if (button) {
            button.addEventListener('mousedown', function(e) {
                e.preventDefault();
            });
        }
    });

    // Add password validation event listeners
    if (passwordInput) {
        let passwordTouched = false;

        // Add input event listener for real-time validation
        passwordInput.addEventListener('input', function() {
            passwordTouched = true;
            updatePasswordStrength(this.value, passwordTouched);
        });

        // Add keyup event listener for immediate feedback
        passwordInput.addEventListener('keyup', function() {
            updatePasswordStrength(this.value, passwordTouched);
        });

        // Add blur event listener to show required message when leaving the field
        passwordInput.addEventListener('blur', function() {
            passwordTouched = true;
            updatePasswordStrength(this.value, true);
        });

        // Add focus event listener to mark the field as touched
        passwordInput.addEventListener('focus', function() {
            passwordTouched = true;
        });
    }

    // Auto-capitalization function
    function capitalizeWords(input) {
        return input
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Add auto-capitalization to specific fields
    const fieldsToCapitalize = ['firstname', 'middlename', 'barangay', 'municipality', 'province', 'country'];
    
    fieldsToCapitalize.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', function(e) {
                // Store cursor position
                const cursorPos = e.target.selectionStart;
                
                // Get input value and remove multiple spaces
                let value = this.value.replace(/\s+/g, ' ');
                
                // Capitalize the words
                const capitalizedValue = capitalizeWords(value);
                
                // Update the value only if it's different to avoid cursor jump
                if (this.value !== capitalizedValue) {
                    this.value = capitalizedValue;
                    
                    // Restore cursor position
                    e.target.setSelectionRange(cursorPos, cursorPos);
                }
            });

            // Also capitalize on blur (when leaving the field)
            element.addEventListener('blur', function() {
                this.value = capitalizeWords(this.value.trim());
            });
        }
    });

    // Add Purok/Street formatting functionality
    const streetField = document.getElementById('street');
    if (streetField) {
        streetField.addEventListener('input', function(e) {
            let value = this.value.trim();
            
            // Store cursor position
            const cursorPos = e.target.selectionStart;
            
            // Remove multiple spaces and trim
            value = value.replace(/\s+/g, ' ').trim();
            
            // Check if input is just a number
            if (/^\d+$/.test(value)) {
                value = `Purok-${value}`;
            } 
            // Check for variations of "purok" format
            else if (/^purok[\s-]*(\d+)$/i.test(value)) {
                const number = value.match(/\d+/)[0];
                value = `Purok-${number}`;
            }
            // Check for variations like "p1", "p-1"
            else if (/^p[\s-]*(\d+)$/i.test(value)) {
                const number = value.match(/\d+/)[0];
                value = `Purok-${number}`;
            }
            // Handle street names with proper spacing (e.g., "Main Street")
            else if (value && !value.toLowerCase().startsWith('purok')) {
                // Split by space and filter out empty strings
                const words = value.split(' ').filter(word => word.length > 0);
                // Capitalize each word
                value = words.map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
            }

            // Update value if different
            if (this.value !== value) {
                this.value = value;
                
                // Try to maintain cursor position for better UX
                if (value.startsWith('Purok-')) {
                    e.target.setSelectionRange(value.length, value.length);
                } else {
                    e.target.setSelectionRange(cursorPos, cursorPos);
                }
            }
        });

        // Auto-append "St." when typing a plain street name and pressing space or tab
        streetField.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Tab') {
                const raw = this.value.trim();
                // Only apply to non-Purok, non-empty values that don't already end with St.
                if (raw && !raw.toLowerCase().startsWith('purok') && !/st\.?$/i.test(raw)) {
                    const words = raw.split(/\s+/).filter(word => word.length > 0);
                    const formattedBase = words.map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ');
                    const formatted = `${formattedBase} St.`;
                    this.value = formatted;

                    // For space, prevent adding an extra space character after formatting
                    if (e.key === ' ') {
                        e.preventDefault();
                    }

                    // Trigger validation so realtime error reflects the new value
                    validateStreet(this.value);
                }
            }
        });

        // Format on blur (when leaving the field)
        streetField.addEventListener('blur', function() {
            let value = this.value.trim();
            
            // Remove multiple spaces
            value = value.replace(/\s+/g, ' ').trim();
            
            // If it's a number only
            if (/^\d+$/.test(value)) {
                this.value = `Purok-${value}`;
            }
            // If it's any variation of purok format
            else if (/^p(?:urok)?[\s-]*(\d+)$/i.test(value)) {
                const number = value.match(/\d+/)[0];
                this.value = `Purok-${number}`;
            }
            // Handle street names
            else if (value && !value.toLowerCase().startsWith('purok')) {
                const words = value.split(' ').filter(word => word.length > 0);
                this.value = words.map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
            }

            // Validate the final format
            const errorMessage = document.getElementById('street_val');
            if (errorMessage) {
                if (this.value.trim() === '') {
                    errorMessage.innerHTML = '<span style="color: red">✗ Purok/Street is required</span>';
                } else if (this.value.startsWith('Purok-') && !/^Purok-\d+$/.test(this.value)) {
                    errorMessage.innerHTML = '<span style="color: red">✗ Invalid Purok format. Use Purok-1, Purok-2, etc.</span>';
                } else if (!this.value.startsWith('Purok-') && !/^[A-Za-z\s]+(?:\sSt\.)?$/.test(this.value)) {
                    errorMessage.innerHTML = '<span style="color: red">✗ Street name should only contain letters, spaces, and may end with "St."</span>';
                } else {
                    errorMessage.innerHTML = '<span style="color: green">✓ Valid format</span>';
                }
            }
        });
    }
});

// Helper function to validate individual fields
function validateField(fieldId, fieldName, errorId) {
    const element = document.getElementById(fieldId);
    const errorSpan = document.getElementById(errorId);
    let isValid = true;

    if (!element || !element.value.trim()) {
        if (errorSpan && element === document.activeElement) {
            errorSpan.innerHTML = `<span style="color: red">✗ ${fieldName} is required!</span>`;
            errorSpan.style.fontSize = "13px";
        }
        isValid = false;
    } else {
        // Additional field-specific validation
        switch (fieldId) {
            case 'idnumber':
                isValid = validateIdNumber(element.value);
                break;
            case 'firstname':
            case 'lastname':
                isValid = validateName(element.value, errorId);
                break;
            case 'email':
                isValid = validateEmail(element.value);
                break;
            case 'passw':
                const strengthResult = checkPasswordStrength(element.value);
                isValid = strengthResult.isValid;
                break;
            case 'postal':
                isValid = validatePostal(element.value);
                break;
            case 'username':
                isValid = validateUsername(element.value);
                break;
            case 'street':
                isValid = validateStreet(element.value);
                break;
            case 'barangay':
                isValid = validateBarangay(element.value);
                break;
            case 'municipality':
            case 'province':
            case 'country':
                isValid = validateLettersOnly(element.value, errorId);
                break;
        }
    }

    return isValid;
}

// Validate ID Number format with persistent error
function validateIdNumber(value) {
    const idPattern = /^\d{4}-\d{4}$/;
    const errorSpan = document.getElementById('idnumber_val');
    
    // First check if ID exists (using the global flag set by AJAX)
    if (typeof idNumberExists !== 'undefined' && idNumberExists) {
        errorSpan.innerHTML = '<span style="color: red">✗ This ID number already exists</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Then check format
    if (!idPattern.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Invalid format! Use xxxx-xxxx</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Only show valid if both checks pass
    if (!idNumberExists) {
        errorSpan.innerHTML = '<span style="color: green">✓ Valid ID format</span>';
    }
    return true;
}

// Validate email format with persistent error
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const errorSpan = document.getElementById('email_val');

    // First check if email exists
    if (typeof emailExists !== 'undefined' && emailExists) {
        errorSpan.innerHTML = '<span style="color: red">✗ This email is already registered</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Then check format
    if (!emailPattern.test(email)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Please enter a valid email format</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Only show valid if both checks pass
    if (!emailExists) {
        errorSpan.innerHTML = '<span style="color: green">✓ Valid email format</span>';
    }
    return true;
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('passw').value;
    const confirmPassword = document.getElementById('cpassword').value;
    const errorSpan = document.getElementById('is-valid-confirmpassword');
    const submitButton = document.querySelector('.button-reg');
    
    if (!confirmPassword) {
        errorSpan.innerHTML = '<span style="color: red">✗ Confirm password is required</span>';
        submitButton.disabled = true;
        return false;
    }

    if (password !== confirmPassword) {
        errorSpan.innerHTML = '<span style="color: red">✗ Passwords do not match</span>';
        submitButton.disabled = true;
        return false;
    }

    errorSpan.innerHTML = '<span style="color: green">✓ Passwords match!</span>';
    // Only enable submit if password meets strength requirements
    const strengthResult = checkPasswordStrength(password);
    submitButton.disabled = (!strengthResult.isValid) || (typeof passwordExists !== 'undefined' && passwordExists) || (typeof passwordCheckPending !== 'undefined' && passwordCheckPending);
    return true;
}

// Validate postal code with persistent error
function validatePostal(value) {
    const errorSpan = document.getElementById('postal_val');
    if (value.length < 4) {
        errorSpan.innerHTML = '<span style="color: red">✗ You need to input exactly 4 digits</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }
    errorSpan.innerHTML = '<span style="color: green">✓ Valid postal code</span>';
    return true;
}

// Validate username format with persistent error
function validateUsername(value) {
    const errorSpan = document.getElementById('username_val');

    // First check if username exists
    if (typeof usernameExists !== 'undefined' && usernameExists) {
        errorSpan.innerHTML = '<span style="color: red">✗ This username is already taken</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Then check length requirements
    if (value.length < 3) {
        errorSpan.innerHTML = '<span style="color: red">✗ Username must be at least 3 characters long</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }
    if (value.length > 15) {
        errorSpan.innerHTML = '<span style="color: red">✗ Username cannot exceed 15 characters</span>';
        errorSpan.style.fontSize = "13px";
        return false;
    }

    // Only show valid if all checks pass
    if (!usernameExists) {
        errorSpan.innerHTML = '<span style="color: green">✓ Valid username</span>';
    }
    return true;
}

// Validate name fields with persistent error
function validateName(value, errorId) {
    const errorSpan = document.getElementById(errorId);
    if (hasThreeRepeatedLetters(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Name cannot contain three or more repeated letters</span>';
        return false;
    }
    if (!validateTwoWords(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Name should not contain more than two words</span>';
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Name should only contain letters</span>';
        return false;
    }
    errorSpan.innerHTML = '<span style="color: green">✓ Valid name format</span>';
    return true;
}

// Validate street/purok with persistent error
function validateStreet(value) {
    const errorSpan = document.getElementById('street_val');
    const regex = /^(?:[A-Za-z]+(?:\s[A-Za-z]+)*(?:\sSt\.)?|\d{1,2}|[A-Za-z]+(?:\s|-)?[A-Za-z]+(?:\s|-)?(?:\d{1,2})?|[A-Za-z]+(?:\s[A-Za-z]+)*\s*\d{1,2})$/;

    if (!value.trim()) {
        errorSpan.innerHTML = '<span style="color: red">✗ Street/Purok is required</span>';
        return false;
    }

    if (!regex.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Invalid format. Use "Purok-1", "1", "Street Name", or "Street Name 1"</span>';
        return false;
    }

    // Allow a trailing period only when used in 'St.'
    if (/[^a-zA-Z0-9\s.-]/.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Special characters are not allowed (except hyphen for Purok format and the dot in "St.")</span>';
        return false;
    }

    errorSpan.innerHTML = '<span style="color: green">✓ Valid street format</span>';
    return true;
}

// Validate barangay with persistent error
function validateBarangay(value) {
    const errorSpan = document.getElementById('barangay_val');
    if (/^\d/.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Cannot start with a number</span>';
            return false;
        }
    if (hasThreeRepeatedLetters(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Barangay cannot contain three or more repeated letters</span>';
        return false;
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Only letters, numbers, spaces, and hyphens allowed</span>';
            return false;
        }
    errorSpan.innerHTML = '<span style="color: green">✓ Valid barangay format</span>';
    return true;
}

// Validate fields that should only contain letters
function validateLettersOnly(value, errorId) {
    const errorSpan = document.getElementById(errorId);
    if (hasThreeRepeatedLetters(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ This field cannot contain three or more repeated letters</span>';
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorSpan.innerHTML = '<span style="color: red">✗ Only letters and spaces allowed</span>';
        return false;
    }
    errorSpan.innerHTML = '<span style="color: green">✓ Valid format</span>';
    return true;
}

// Password strength checker function
function checkPasswordStrength(password) {
    // Initialize variables
    let strength = 0;
    let feedback = [];
    let requirements = {
        length: false,
        number: false,
        lowercase: false,
        uppercase: false,
        special: false
    };

    // Check length
    requirements.length = password.length >= 8;
    if (requirements.length) strength += 1;

    // Check for numbers
    requirements.number = /\d/.test(password);
    if (requirements.number) strength += 1;

    // Check for lowercase letters
    requirements.lowercase = /[a-z]/.test(password);
    if (requirements.lowercase) strength += 1;

    // Check for uppercase letters
    requirements.uppercase = /[A-Z]/.test(password);
    if (requirements.uppercase) strength += 1;

    // Check for special characters
    requirements.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (requirements.special) strength += 1;

    // Build feedback array based on requirements
    if (!requirements.length) feedback.push("<span style='color: red'>✗</span> At least 8 characters");
    else feedback.push("<span style='color: green'>✓</span> At least 8 characters");
    
    if (!requirements.number) feedback.push("<span style='color: red'>✗</span> At least 1 number");
    else feedback.push("<span style='color: green'>✓</span> At least 1 number");
    
    if (!requirements.lowercase) feedback.push("<span style='color: red'>✗</span> At least 1 lowercase letter");
    else feedback.push("<span style='color: green'>✓</span> At least 1 lowercase letter");
    
    if (!requirements.uppercase) feedback.push("<span style='color: red'>✗</span> At least 1 uppercase letter");
    else feedback.push("<span style='color: green'>✓</span> At least 1 uppercase letter");
    
    if (!requirements.special) feedback.push("<span style='color: red'>✗</span> At least 1 special character");
    else feedback.push("<span style='color: green'>✓</span> At least 1 special character");

    // Determine strength level
    let strengthLevel;
    let strengthColor;
    
    if (strength === 0) {
        strengthLevel = "Very Weak";
        strengthColor = "#ff0000"; // Red
    } else if (strength <= 2) {
        strengthLevel = "Weak";
        strengthColor = "#ff4500"; // Orange Red
    } else if (strength <= 3) {
        strengthLevel = "Medium";
        strengthColor = "#ffa500"; // Orange
    } else if (strength <= 4) {
        strengthLevel = "Strong";
        strengthColor = "#9acd32"; // Yellow Green
    } else {
        strengthLevel = "Very Strong";
        strengthColor = "#008000"; // Green
    }

    return {
        strength: strengthLevel,
        color: strengthColor,
        feedback: feedback,
        isValid: strength === 5
    };
}

// Function to update password strength UI
function updatePasswordStrength(password, showRequired = false) {
    const strengthIndicator = document.getElementById('password-strength');
    const requirementsIndicator = document.getElementById('password-req');
    const errorSpan = document.getElementById('is-valid-password');
    const submitButton = document.querySelector('.button-reg');
    
    // If duplicate password is detected, show the error and prevent clearing
    if (typeof passwordExists !== 'undefined' && passwordExists) {
        if (errorSpan) {
            errorSpan.innerHTML = '<span style="color: red">Password Already Exist</span>';
        }
        if (submitButton) {
            submitButton.disabled = true;
        }
        return;
    }

    // If a check is pending and UI already shows duplicate message, keep it sticky
    if (typeof passwordCheckPending !== 'undefined' && passwordCheckPending) {
        if (errorSpan && (errorSpan.textContent.includes('Password Already Exist') || errorSpan.innerHTML.includes('Password Already Exist'))) {
            if (submitButton) {
                submitButton.disabled = true;
            }
            return;
        }
    }

    // Clear all previous messages when not duplicate
    errorSpan.textContent = "";
    strengthIndicator.innerHTML = "";
    requirementsIndicator.innerHTML = "";
    
    // Only show required message if the field has been touched or showRequired is true
    if ((!password || password.trim() === '') && showRequired) {
        errorSpan.innerHTML = '<span style="color: red">Password is required</span>';
        submitButton.disabled = true;
        return;
    }

    // If password is empty and we're not showing required message, just return
    if (!password || password.trim() === '') {
        return;
    }

    // Rest of the password validation logic remains the same
    if (/\s/.test(password)) {
        errorSpan.innerHTML = '<span style="color: red">Password cannot contain spaces</span>';
        submitButton.disabled = true;
        return;
    }

    // Check password strength
    const strengthResult = checkPasswordStrength(password);
    
    // Update strength indicator with animation
    strengthIndicator.innerHTML = `Password Strength: <span style="color: ${strengthResult.color}; font-weight: bold">${strengthResult.strength}</span>`;
    
    // Update requirements with animation
    requirementsIndicator.style.transition = 'all 0.3s ease';
    requirementsIndicator.innerHTML = strengthResult.feedback.join("<br>");
    
    // Update submit button state
    submitButton.disabled = (!strengthResult.isValid) || (typeof passwordExists !== 'undefined' && passwordExists) || (typeof passwordCheckPending !== 'undefined' && passwordCheckPending);

    // Update progress bar
    let progressBar = document.getElementById('password-strength-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'password-strength-bar';
        progressBar.style.height = '5px';
        progressBar.style.marginTop = '5px';
        progressBar.style.transition = 'all 0.3s ease';
        progressBar.style.borderRadius = '3px';
        strengthIndicator.parentNode.insertBefore(progressBar, strengthIndicator.nextSibling);
    }

    const strengthLevels = {
        "Very Weak": 20,
        "Weak": 40,
        "Medium": 60,
        "Strong": 80,
        "Very Strong": 100
    };
    
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#e0e0e0';
    const progressWidth = strengthLevels[strengthResult.strength];
    
    // Smooth progress bar update
    const progressInner = document.createElement('div');
    progressInner.style.width = `${progressWidth}%`;
    progressInner.style.height = '100%';
    progressInner.style.backgroundColor = strengthResult.color;
    progressInner.style.transition = 'all 0.3s ease';
    progressInner.style.borderRadius = '3px';
    progressBar.innerHTML = '';
    progressBar.appendChild(progressInner);

    // Update confirm password validation if it has a value
    const confirmPassword = document.getElementById('cpassword').value;
    if (confirmPassword) {
        updatePasswordMatch(password, confirmPassword);
    }
}

// Function to update password match status
function updatePasswordMatch() {
    const passwordInput = document.getElementById('passw');
    const confirmPasswordInput = document.getElementById('cpassword');
    const errorSpan = document.getElementById('is-valid-confirmpassword');
    const submitButton = document.querySelector('.button-reg');

    // Get current values
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Don't clear previous message automatically
    // Only update message when there's a change in status

    // If confirm password field has a value
    if (confirmPassword) {
        if (password === confirmPassword) {
            // Only update if it's not already showing match message
            if (!errorSpan.innerHTML.includes('✓ Passwords match!')) {
                errorSpan.innerHTML = '<span style="color: green">✓ Passwords match!</span>';
                // Only enable submit if password meets strength requirements
                const strengthResult = checkPasswordStrength(password);
                submitButton.disabled = (!strengthResult.isValid) || (typeof passwordExists !== 'undefined' && passwordExists) || (typeof passwordCheckPending !== 'undefined' && passwordCheckPending);
            }
        } else {
            // Show or maintain mismatch message
            errorSpan.innerHTML = '<span style="color: red">✗ Passwords do not match</span>';
            submitButton.disabled = true;
        }
    } else if (confirmPasswordInput === document.activeElement) {
        // If confirm password field is focused but empty
        errorSpan.innerHTML = '<span style="color: red">✗ Confirm password is required</span>';
        submitButton.disabled = true;
    }
}

// Add password validation event listeners
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passw');
    const confirmPasswordInput = document.getElementById('cpassword');
    
    if (passwordInput && confirmPasswordInput) {
        // Password field events
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value, true);
            if (confirmPasswordInput.value) {
                validatePasswordMatch();
            }
        });

        passwordInput.addEventListener('blur', function() {
            updatePasswordStrength(this.value, true);
        });

        // Confirm password field events
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        confirmPasswordInput.addEventListener('blur', validatePasswordMatch);
    }
});

