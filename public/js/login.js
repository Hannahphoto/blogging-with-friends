const loginFormHandler = async function(event) {
    event.preventDefault();

    // const email = document.querySelector('#email-login');
    const password = document.querySelector('#password-login');
      const name = document.querySelector('#name-login');

    // if(email && password){
        const response = await fetch('/api/user/login',{
            method: 'POST',
            body: JSON.stringify({
                email: email.value, 
                password: password.value,
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Failed to log in!');
        }
    };
// };

const signupFormHandler = async (event)=>{
    event.preventDefault();

    const username = document.querySelector('#username-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');

    if(username && email && password){
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Failed to sign up!')
        }
    };
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#sign-form').addEventListener('submit', signupFormHandler);