const loginFormHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input-login');
    const passwordEl = document.querySelector('#password-login');
     console.log(usernameEl.value, passwordEl.value);

        const response = await fetch('/api/users/login',{
            method: 'POST',
            body: JSON.stringify({
               username: usernameEl.value,
               password: passwordEl.value,
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }else{
            console.log(response);
            alert('Failed to log in!');
        }
};


const signupFormHandler = async (event)=>{
    event.preventDefault();

    const usernameEl = document.querySelector('#username-signup');

    const passwordEl = document.querySelector('#password-signup');

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameEl.value,
                password: passwordEl.value,
            }),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok){
            alert("Account created! Loggin you in now.")
            document.location.replace('/dashboard');
            console.log(response)
        }else{
            alert(response.statusText)
        }
    };

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#sign-form').addEventListener('submit', signupFormHandler);