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

var portNameEl=$('#nameInput')
var nameText = '';
//button function to save name from textarea box
$('#inputBtn').on('click', portName)
function portName(event){
    event.preventDefault();
    console.log('p')
    nameText = portNameEl.val()
    //instead of set item we can just send var nameText to array object
    localStorage.setItem('name',nameText)
}