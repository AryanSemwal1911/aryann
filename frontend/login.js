document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continueBtn');
    const phoneInput = document.getElementById('phone-input');
    const errorMessage = document.getElementById('errorMessage');

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    };

    const hideError = () => {
        errorMessage.style.display = 'none';
    };

    continueBtn.addEventListener('click', () => {
        const phoneNumber = phoneInput.value.trim();
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        
        if (!validatePhone(cleanPhone)) {
            showError('Please enter a valid 10-digit phone number');
            return;
        }

        hideError();
        sessionStorage.setItem('phoneNumber', cleanPhone);
        
        continueBtn.textContent = 'Please wait...';
        continueBtn.style.opacity = '0.7';
        continueBtn.disabled = true;
        
        setTimeout(() => {
            window.location.href = '/birthyear.html';
        }, 500);
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
        hideError();
    });

    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') continueBtn.click();
    });

    sessionStorage.removeItem('birthYear');
});