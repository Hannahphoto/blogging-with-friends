
const newFormHandler = async function(event){
    event.preventDefault();

    // const postBlog = document.getElementById("#postBlog").value;
    const title = document.querySelector('input[name ="title"]').value;
    const body = document.querySelector('textarea[name="content"]').value;

    
    await fetch(`/api/blogRouts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type': 'application/json'},
    });
    document.location.replace('/dashboard');
};

document.querySelector('#postBlog').addEventListener('submit',newFormHandler);