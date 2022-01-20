const handleAddComment = async (e) => {
    e.preventDefault();

    const post_user_id = $("#post-user_id").val();

    const body = {
        post_id: $("#post_id").val(),
        user_id: $("#user_id").val(),
        body: $("#body").val()
    };
    body.body.replace("<script","<YOU CANNOT DO THIS");
    const createComment = await fetch(`/api/comments/add`, {
        method: `POST`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body)
    });
    if (createComment.ok === true) {
        const result = await createComment.json();
        window.location.replace(`/posts/${post_user_id}/${body.post_id}`);
    }
};

const handleUpdateComment =  async (e) => {
    e.preventDefault();

    const body = {
        id: $("#comment-id").val(),
        post_id: $("#comment-post_id").val(),
        user_id: $("#comment-user_id").val(),
        body: $("#comment-body").val(),
    };
    const updateComment = await fetch(`/api/comments/update/${body.id}`, {
        method: `PUT`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body)
    });
    if (updateComment.ok === true) {
        window.location.replace(`/posts/${body.user_id}/${body.post_id}`);
    }
};



// Add event handlers
if ($("#comments-add").length) {
    $("#comments-add").submit(handleAddComment);
};

if ($("#comments-update").length) {
    $("#comments-update").submit(handleUpdateComment);
};