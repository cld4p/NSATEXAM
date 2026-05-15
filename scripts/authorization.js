async function createAccount(event) {
    if (event) event.preventDefault();
    
    const alertEl = document.getElementById('alert-msg');
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const pwd = document.getElementById('pwd').value;
    const confirmPwd = document.getElementById('cpwd').value;
    const mobNo = document.getElementById('mob').value;

    alertEl.innerText = "";

    if(pwd != confirmPwd) { 
        alertEl.innerText = "Passwords do not match"; 
        return; 
    }
    if(pwd.length < 8) { 
        alertEl.innerText = "Password too short";
        return; 
    }
    if(mobNo.length != 10 || isNaN(mobNo)) { 
        alertEl.innerText = "Invalid Mobile"; 
        return; 
    }
    if(name.length < 3 || !isNaN(name)) { 
        alertEl.innerText = "Invalid Name"; 
        return; 
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                name: name,
                password: pwd,
                mobile: mobNo
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = "log_in.html";
        } else {
            alertEl.innerText = result.message;
        }
    } catch (error) {
        window.location.href = "home.html";
    }
}

async function loginAccount(event) {
    if (event) event.preventDefault();

    const alertEl = document.getElementById('alert-msg');
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('pwd').value;

    alertEl.innerText = "";

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: pwd
            })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify(result.user));

            window.location.href = "home.html"; 
        } else {
            alertEl.innerText = result.message;
        }
    } catch (error) {
        window.location.href = "home.html";
    }


}