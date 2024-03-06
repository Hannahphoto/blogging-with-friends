
document.addEventListener('DOMContentLoaded',function(){
    //select the new post button
    const newPostButton = document.getElementById('btn-newPost');
    const containerPosts = document.querySelectorAll('.containerPost');
    const postBlogForm = document.getElementById('postBlog');

    console.log("New Post Button:", newPostButton);

    //add click event listenter to the button
    newPostButton.addEventListener('click', function(){
        //toggle the visibility of the form
       containerPosts.forEach(function(containerPost){
        containerPost.style.display = 'none';
       });

       postBlogForm.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded',function(){
    const createPostBtn = document.getElementById('btn-createPost');
 
    //add a click event listenter to the create post button
    createPostBtn.addEventListener('click', createPostHandler);
  
});

// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const body = document.querySelector('#content').value;
    
    if(title && body){
        const response = await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({title, body}),
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

// document.querySelector("#btn-newPost").addEventListener('submit', createPostHandler);

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

const showCreateBlogForm = () => {
    document.getElementById('postBlog').style.display = "block";
};

const hideCreateBlogForm = () => {
    document.getElementById('postBlog').style.display = "none";
};

// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// newPostButton.addEventListener('click', function(){
//     showCreateBlogForm();
// });

// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// createPostButton.addEventListener('click', function(){
//     //add logic to handle fomr submission
//     createPostHandler();
//     //update dashboard with list

//     //hide form after submit.
//     hideCreateBlogForm();
// });

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard




// document.querySelector('.blog-list').addEventListener('click', delButtonHandler());



// if(postBlogForm){
//     postBlogForm.style.display = (postBlogForm.style.display === 'none' || postBlogForm.style.display === '' ) ? 'block': 'none';
//     }else{
//         console.error("post blog form not found");
//     }
// });