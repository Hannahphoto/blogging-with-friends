// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title');
    const content = document.querySelector('#blog-content');

    if(title && content){
        const response = await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({title, content}),
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

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
document.querySelector('#btn-newPost ').addEventListener('submit', function(){
    document.getElementById('postBlog').style.display="block";
});

// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
document.querySelectord('btn-createPost').addEventListener('submit', function(){
    //add logic to handle fomr submission

    //hide form after submit.
    document.getElementById('postBlog').style.display="none";
})

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
document.querySelector('.blog-list').addEventListener('click', delButtonHandler());



