// const newPostButton = document.getElementById("#btn-newPost");
// const createPostButton = document.getElementById('#btn-createPost');

// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

const createPostHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-title');
    const description = document.querySelector('#blog-content');

    if(name && description){
        const response = await fetch(`/dashboard`, {
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

    const response = await fetch(`/dashboard/${id}`,{
        method: 'DELETE',
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }else{
        alert('Failed to delete blog.')
    }}
};

const showCreateBlogForm = () => {
    document.getElementById('postBlog').style.display = "block";
};

const hideCreateBlogForm = () => {
    document.getElementById('postBlog').style.display = "none";
};

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
newPostButton.addEventListener('click', function(){
    showCreateBlogForm();
});

// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
createPostButton.addEventListener('click', function(){
    //add logic to handle fomr submission
    createPostHandler();
    //update dashboard with list

    //hide form after submit.
    hideCreateBlogForm();
});

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
document.querySelector('.blog-list').addEventListener('click', delButtonHandler());



