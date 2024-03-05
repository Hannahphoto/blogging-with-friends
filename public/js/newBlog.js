
const newFormHandler = async function(event){
    event.preventDefault();

    // const postBlog = document.getElementById("#postBlog").value;
    const title = document.querySelector('input[name ="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    
    await fetch(`/api/blogRoutes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json'},
    });
    document.location.replace('/dashboard');
};

document.querySelector('#postBlog').addEventListener('submit',newFormHandler);