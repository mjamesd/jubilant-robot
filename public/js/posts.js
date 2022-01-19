const handleAddPost = async (e) => {
    e.preventDefault();

    const body = {
        user_id: $("#user_id").val(),
        title: $("#title").val(),
        body: $("#body").val()
    };
    const createPost = await fetch(`/api/posts/add`, {
        method: `POST`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body)
    });
    if (createPost.ok === true) {
        const result = await createPost.json();
        window.location.replace(`/posts/${body.user_id}/${result.postId}`);
    }
};

const handleUpdatePost =  async (e) => {
    e.preventDefault();

    const body = {
        id: $("#post-id").val(),
        user_id: $("#post-user_id").val(),
        title: $("#post-title").val(),
        body: $("#post-body").val(),
    };
    const updatePost = await fetch(`/api/posts/update/${body.id}`, {
        method: `PUT`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body)
    });
    if (updatePost.ok === true) {
        const result = await updatePost.json();
        window.location.replace(`/posts/${body.user_id}/${body.id}`);
    }
};



// Add event handlers
if ($("#posts-add").length) {
    $("#posts-add").submit(handleAddPost);
};

if ($("#posts-update").length) {
    $("#posts-update").submit(handleUpdatePost);
};