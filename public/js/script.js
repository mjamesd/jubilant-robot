
const handleDelete = async (el) => {
    const model = $(el.currentTarget).attr("data-model");
    const modelProper = model.substr(0,1).toUpperCase() + model.slice(1);
    const id = $(el.currentTarget).attr("data-id");
    const confirmDelete = confirm(`Are you sure you want to delete this ${modelProper} with ID ${id}?`);
    if (model && id && confirmDelete) {
        const response = await fetch(`/api/${model}s/delete/${id}`, {
            method: `DELETE`,
            headers: { 'Content-Type': `application/json` },
        });
        if (response.ok === true) {
            alert(`${modelProper} successfully deleted.`);
            window.location.replace(`/dashboard`);
        }
    }
};


$(document).ready(() => {
    // Initialize Materialize JS components
    $('.sidenav').sidenav();
    M.updateTextFields();
    $(".delete").click(handleDelete);
});