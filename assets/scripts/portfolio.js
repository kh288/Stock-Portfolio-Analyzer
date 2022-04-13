const saveButtonEl = $("#button-save-portfolio");
const deleteButtonEl = $("#button-delete-portfolio");

saveButtonEl.on("click", function()
{
    localStorage.setItem("portfolio-name", "Mega Stonks");
    alert("Save button pressed!");
});

deleteButtonEl.on("click", function()
{
    localStorage.removeItem("portfolio-name");
    alert("Delete button pressed!");
});