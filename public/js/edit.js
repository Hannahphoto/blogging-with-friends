

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
const editBlog = document.querySelector('input[name="blog-edit"]').value;

const editFormHandler = async function(event){
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const body = document.querySelector('textarea[name="content"]').value;

    await fetch(`/api/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    document.location.replace('/dashboard');
}

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


document.addEventListener('DOMContentLoaded', function(){
    const editPostButton = document.getElementById("btn-editPost");
    editPostButton.addEventListener('click',editFormHandler )
});

document.addEventListener('DOMContentLoaded', function(){
    const editPostButton = document.getElementById("btn-editPost");
    editPostButton.addEventListener('click', delButtonHandler )
});