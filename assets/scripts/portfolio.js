const portfolioEl = $("#portfolio");
const portfolioListEl = $("#portfolio-list");
const addPositionEl = $("#button-add-position");
const saveButtonEl = $("#button-save-portfolio");
const deleteButtonEl = $("#button-delete-portfolio");
var portNameEl=$('#nameInput')

var portfolio = {
    name: "Mega Stonks",
    positions : []
};

portfolioListEl.on("click", ".delete-position", function()
{
    var deletedPositionIndex = $(this).parent().index();
    portfolio.positions.splice(deletedPositionIndex, 1);
    console.log(portfolio);

    $(this).parent().remove();
});

addPositionEl.on("click", function()
{
    var newPosition = getNewPosition();
    portfolio.positions.push(newPosition);
    console.log(portfolio);

    const positionEl = $("<div class='flex p-5 grid grid-cols-5 divide-x text-md divide-transparent shrink'>");

    const tickerEl = $("<h3>");
    tickerEl.text(newPosition.ticker);
    const amountEl = $("<p>");
    amountEl.text("Amount: " + newPosition.size);
    const priceEl = $("<p>");
    priceEl.text("Current Price: $165.75 (-4.34 -2.55%)");
    const positionPriceEl = $("<p>");
    positionPriceEl.text("Position Value: $8,375.00 (-$217.00)");
    const deleteButtonEl = $("<button class='delete-position' type='button'>");
    deleteButtonEl.text("Delete Position");
    
    tickerEl.appendTo(positionEl);
    amountEl.appendTo(positionEl);
    priceEl.appendTo(positionEl);
    positionPriceEl.appendTo(positionEl);
    deleteButtonEl.appendTo(positionEl);

    positionEl.appendTo(portfolioListEl);
});

saveButtonEl.on("click", function()
{
    localStorage.setItem("portfolio-name", "Mega Stonks");
});

deleteButtonEl.on("click", function()
{
    localStorage.removeItem("portfolio-name");
    alert("Delete button pressed!");

});

function getNewPosition() // TODO: Query user for input
{
    return {
        ticker: "AAPL",
        size: (portfolio.positions.length + 1) * 10
    };
}

//button function to save name from textarea box
$('#inputBtn').on('click', portName)
function portName(event){
    event.preventDefault();
    console.log('sent portfolio name')
    portfolio.name = portNameEl.val()    
};
