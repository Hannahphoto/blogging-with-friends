const newFromHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#project-name');
    const description = document.querySelector('#project-desc');

    if(name && description){
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({name, description}),
            headers:{
                'Content-Type': 'application/json',
            },
        });

    if(response.ok){
        document.location.replace('/profile');
    }else{
        alert('Failed to create project')
    }
    }
};

const delButtonHandler = async(event) => {
    if(event.target.hasAttribute('data-id'));

    const response = await fetch(`/api/projects/${id}`,{
        method: 'DELETE',
    });

    if(response.ok){
        document.location.replace('/profile');
    }else{
        alert('Failed to delete project.')
    }
};

document.querySelector('.new-project-form').addEventListener('submit', newFromHandler);

document.querySelector('.project-list').addEventListener('click', delButtonHandler);