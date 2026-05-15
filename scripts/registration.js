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



//states

const states = [
    { name: "Andaman and Nicobar Islands", code: "ANI" },
    { name: "Andhra Pradesh", code: "APR" },
    { name: "Arunachal Pradesh", code: "ARU" },
    { name: "Assam", code: "ASS" },
    { name: "Bihar", code: "BIH" },
    { name: "Chandigarh", code: "CHG" },
    { name: "Chhattisgarh", code: "CHH" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", code: "DDD" },
    { name: "Delhi", code: "DEL" },
    { name: "Goa", code: "GOA" },
    { name: "Gujarat", code: "GUJ" },
    { name: "Haryana", code: "HAR" },
    { name: "Himachal Pradesh", code: "HIM" },
    { name: "Jammu and Kashmir", code: "JNK" },
    { name: "Jharkhand", code: "JHA" },
    { name: "Karnataka", code: "KAR" },
    { name: "Kerala", code: "KER" },
    { name: "Ladakh", code: "LAD" },
    { name: "Lakshadweep", code: "LKD" },
    { name: "Madhya Pradesh", code: "MPR" },
    { name: "Maharashtra", code: "MAH" },
    { name: "Manipur", code: "MAN" },
    { name: "Meghalaya", code: "MEG" },
    { name: "Mizoram", code: "MIZ" },
    { name: "Nagaland", code: "NAG" },
    { name: "Odisha", code: "ODI" },
    { name: "Puducherry", code: "PUD" },
    { name: "Punjab", code: "PUN" },
    { name: "Rajasthan", code: "RAJ" },
    { name: "Sikkim", code: "SIK" },
    { name: "Tamil Nadu", code: "TAM" },
    { name: "Telangana", code: "TEL" },
    { name: "Tripura", code: "TRI" },
    { name: "Uttar Pradesh", code: "UPR" },
    { name: "Uttarakhand", code: "UTK" },
    { name: "West Bengal", code: "WBE" }
];

const stateListElements = document.querySelectorAll('.state-list');

const optionStates = states.map(state => 
    `<option value="${state.code}">${state.name}</option>`).join('');

stateListElements.forEach(sList => {
    sList.innerHTML += optionStates;
})





//Registration Check

async function submitRegistration(event) {
    if (event) event.preventDefault();

    const alertMsg = document.getElementById('alert-msg');

    const form = document.querySelector('#reg-form');
    const formData = new FormData(form);
    
    const fname = formData.get('fname');
    const lname = formData.get('lname');
    const dob = formData.get('dob');
    const gender = formData.get('gender');
    const momName = formData.get('maname');
    const dadName = formData.get('faname');
    const nationality = formData.get('nation');
    const category = formData.get('category');
    const rState = formData.get('rState');
    const subject = formData.get('subject');

    const age = document.getElementById('age-span');

    const p1 = formData.get('p1');
    const p2 = formData.get('p2');
    const p3 = formData.get('p3');

    if(fname.length < 2 || lname.length < 2 || !isNaN(fname) || !isNaN(lname)) { // isNan is used because the name must not be a number
        alertMsg.innerText = "Invalid Name";
        return;
    }

    if(parseInt(age.textContent) < 16) {
        alertMsg.innerText = "You must be above 16 to partake in this test";
        return;
    }

    if(momName.length < 2 || dadName.length < 2 || !isNaN(momName) || !isNaN(dadName)) {
        alertMsg.innerText = "Invalid Parent Name";
        return;
    }

    if(p1 == p2 || p2 == p3 || p1 == p3) {
        alertMsg.innerText = "State Priorities Cannot Be Same";
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alertMsg.innerText = "Please log in to submit your registration.";
        return;
    }

    const registrationData = {
        currentUserEmail: currentUser.email,
        firstName: fname,
        lastName: lname,
        dob: dob,
        gender: gender,
        motherName: momName,
        fatherName: dadName,
        nationality: nationality,
        category: category,
        state: rState,
        subject: subject,
        priority1: p1,
        priority2: p2,
        priority3: p3
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/save_exam_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });

        if (response.ok) {
            window.location.href = "home.html";
        } else {
            const result = await response.json();
            alertMsg.innerText = result.message;
        }
    } catch (error) {
        window.location.href = "home.html";
    }
}