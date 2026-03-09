document.addEventListener('DOMContentLoaded', () => {
    const verifyBtn = document.getElementById('verifyBtn');
    const birthYearInput = document.getElementById('birth-year');
    const phoneDisplay = document.getElementById('phoneDisplay');
    const errorMessage = document.getElementById('errorMessage');
    const backBtn = document.getElementById('backBtn');

    // Get phone number
    const phoneNumber = sessionStorage.getItem('phoneNumber');
    
    if (!phoneNumber) {
        // No phone number, go back to login
        window.location.href = '/';
        return;
    }

    // Display phone number
    phoneDisplay.textContent = `📱 +91 ${phoneNumber}`;

    // Validate birth year
    const validateBirthYear = (year) => {
        const yearNum = parseInt(year);
        const currentYear = new Date().getFullYear();
        
        if (isNaN(yearNum)) return false;
        if (year.length !== 4) return false;
        if (yearNum < 1900 || yearNum > currentYear) return false;
        
        return true;
    };

    // Show error
    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        birthYearInput.style.borderColor = '#dc3545';
        setTimeout(() => {
            birthYearInput.style.borderColor = '';
        }, 500);
    };

    // Hide error
    const hideError = () => {
        errorMessage.style.display = 'none';
    };

    // Handle verify button
    verifyBtn.addEventListener('click', () => {
        const birthYear = birthYearInput.value.trim();
        
        if (!validateBirthYear(birthYear)) {
            showError('Please enter a valid 4-digit birth year (1900-2024)');
            return;
        }

        hideError();
        
        // Show loading
        verifyBtn.textContent = 'Please wait...';
        verifyBtn.disabled = true;
        
        // Store birth year
        sessionStorage.setItem('birthYear', birthYear);
        
        // Redirect to video
        setTimeout(() => {
            window.location.href = '/video-page';
        }, 1000);
    });

    // Auto-format: only numbers, max 4 digits
    birthYearInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        e.target.value = value;
        hideError();
    });

    // Handle enter key
    birthYearInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyBtn.click();
        }
    });

    // Handle back button
    backBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
});