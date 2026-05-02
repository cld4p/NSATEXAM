document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dob-input');

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;

    const ageSpan = document.getElementById('age-span');

    
    dobInput.setAttribute('max', formattedToday);

    dobInput.addEventListener('change', () => {
        const birthDate = new Date(dobInput.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        ageSpan.textContent = age;

        if(age<16) {
            ageSpan.style.color = 'red';
        } else {
            ageSpan.style.color = 'green';
        }
    
    });
});