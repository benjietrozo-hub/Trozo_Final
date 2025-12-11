// Register Page JavaScript

// Keep only the helper functions that aren't in Val.js
function hasThreeRepeatedLetters(str) {
    const lowerStr = str.toLowerCase();
    for (let i = 0; i < lowerStr.length - 2; i++) {
        if (lowerStr[i] === lowerStr[i + 1] && lowerStr[i] === lowerStr[i + 2]) {
            return true;
        }
    }
    return false;
}

function validateTwoWords(str) {
    const cleanStr = str.trim().replace(/\s+/g, ' ');
    const words = cleanStr.split(' ');
    return words.length <= 2;
}

// Add this new function for suffix formatting
function formatSuffix(suffix) {
    // Remove extra spaces and convert to lowercase for checking
    let cleanSuffix = suffix.trim().toLowerCase();
    
    // Roman numerals pattern (I, II, III, IV, V, VI, VII, VIII, IX, X)
    const romanNumerals = {
        'i': 'I',
        'ii': 'II',
        'iii': 'III',
        'iv': 'IV',
        'v': 'V',
        'vi': 'VI',
        'vii': 'VII',
        'viii': 'VIII',
        'ix': 'IX',
        'x': 'X'
    };

    // Common suffixes
    const commonSuffixes = {
        'jr': 'Jr.',
        'jr.': 'Jr.',
        'sr': 'Sr.',
        'sr.': 'Sr.'
    };

    // Check if it's a Roman numeral
    if (romanNumerals.hasOwnProperty(cleanSuffix)) {
        return romanNumerals[cleanSuffix];
    }

    // Check if it's a common suffix
    if (commonSuffixes.hasOwnProperty(cleanSuffix)) {
        return commonSuffixes[cleanSuffix];
    }

    return suffix; // Return original if no match
}

// Function to capitalize first letter of each word (same as firstname)
function capitalizeLastName(input) {
    return input
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the suffix field
    const suffixElement = document.getElementById('suffix');
    if (suffixElement) {
        suffixElement.addEventListener('input', function() {
            const suffixInput = this.value;
            const formattedSuffix = formatSuffix(suffixInput);
            if (formattedSuffix !== suffixInput) {
                this.value = formattedSuffix;
            }
        });
    }

    // Add event listener for the lastname field (same behavior as firstname)
    const lastnameElement = document.getElementById('lastname');
    if (lastnameElement) {
        lastnameElement.addEventListener('input', function(e) {
            // Store cursor position
            const cursorPos = e.target.selectionStart;
            
            // Get input value and remove multiple spaces (but keep single spaces)
            let value = this.value.replace(/\s+/g, ' ');
            
            // Capitalize the words
            const capitalizedValue = capitalizeLastName(value);
            
            // Update the value only if it's different to avoid cursor jump
            if (this.value !== capitalizedValue) {
                this.value = capitalizedValue;
                
                // Restore cursor position
                e.target.setSelectionRange(cursorPos, cursorPos);
            }
        });

        // Also capitalize on blur (when leaving the field)
        lastnameElement.addEventListener('blur', function() {
            this.value = capitalizeLastName(this.value.trim());
        });
    }
});

