const loginFormHandler = async function(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login');
    const password = document.querySelector('#password-login');
   

    if(email && password){
        const response = await fetch('/api/users/login',{
            method: 'POST',
            body: JSON.stringify({
               email,
               password
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Failed to log in!');
        }
};
};

const signupFormHandler = async (event)=>{
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password){
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email, 
                password
            }),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok){
            alert("Account created! Loggin you in now.")
            document.location.replace('/');
            console.log(response)
        }else{
            alert(response.statusText)
        }
    };
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#sign-form').addEventListener('submit', signupFormHandler);