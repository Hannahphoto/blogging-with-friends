// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard


const newFromHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#project-name');
    const description = document.querySelector('#project-desc');

    if(name && description){
        const response = await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({name, description}),
            headers:{
                'Content-Type': 'application/json',
            },
        });

    if(response.ok){
        document.location.replace('/dashboard');
    }else{
        alert('Failed to create blog')
    }
    }
};

const delButtonHandler = async(event) => {
    if(event.target.hasAttribute('data-id')){

    const response = await fetch(`/api/dashboard/${id}`,{
        method: 'DELETE',
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }else{
        alert('Failed to delete blog.')
    }}
};

document.querySelector('.new-project-form').addEventListener('submit', newFromHandler);

document.querySelector('.project-list').addEventListener('click', delButtonHandler);