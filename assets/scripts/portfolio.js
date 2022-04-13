const portfolioNameDialogEl = $("#enter-portfolio-name-dialog");
const portfolioNameDialogInputEl = $("#enter-portfolio-name-dialog-input");
const portfolioPositionDialogEl = $("#enter-position-dialog");
const portfolioPositionDialogTickerInputEl = $("#enter-position-dialog-ticker-input");
const portfolioPositionDialogSizeInputEl = $("#enter-position-dialog-size-input");
const portfolioNameEl = $("#portfolio-name");
const portfolioEl = $("#portfolio");
const portfolioListEl = $("#portfolio-list");
const addPositionEl = $("#button-add-position");
const saveButtonEl = $("#button-save-portfolio");
const deleteButtonEl = $("#button-delete-portfolio");
const portNameEditButtonEl=$('#inputBtn');
const portfolioAddPositionButtonEl=$('#button-add-position');
const defaultPortfolio = {
    name: "Mega Stonks",
    positions : []
};

var portfolio;

portfolioListEl.on("click", ".delete-position", function()
{
    var deletedPositionIndex = $(this).parent().index();
    portfolio.positions.splice(deletedPositionIndex, 1);
    console.log(portfolio);

    $(this).parent().remove();
});

addPositionEl.on("click", function()
{
    portfolioPositionDialogEl[0].showModal();
});

saveButtonEl.on("click", function()
{
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    console.log(portfolio);
});

deleteButtonEl.on("click", function()
{
    localStorage.removeItem("portfolio");
});

portfolioNameDialogEl.on("close", function()
{
    if(portfolioNameDialogEl[0].returnValue === "ok")
    {
        portfolio.name = portfolioNameDialogInputEl.val();
    }
    refreshPortfolioName();
});

portfolioPositionDialogEl.on("close", function()
{
    if(portfolioPositionDialogEl[0].returnValue === "ok")
    {
        var newPosition = getNewPosition(portfolioPositionDialogTickerInputEl.val(), portfolioPositionDialogSizeInputEl.val());
        portfolio.positions.push(newPosition);
        addPositionToList(newPosition);
    }
    portfolioPositionDialogTickerInputEl.val("");
    portfolioPositionDialogSizeInputEl.val("");
});

function getNewPosition(ticker, size) // TODO: Query user for input
{
    return {
        ticker: ticker,
        size: size
    };
}

function addPositionToList(position)
{
    const positionEl = $("<div class='flex p-5 grid grid-cols-5 divide-x text-md divide-transparent shrink'>");

    const tickerEl = $("<h3>");
    tickerEl.text(position.ticker);
    const amountEl = $("<p>");
    amountEl.text("Amount: " + position.size);
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
}

//button function to save name from textarea box
var tvDisplay = $('#totalValue')
//display current name of portfolio and value
function portfolioValue(portfolio,currentPrice){
    //example for testing function
    var portfolio = {
        name: "Mega Stonks",
        positions : [
        {ticker: 'AAPL', size: 100},
        {ticker: 'TSLA', size: 90}]
    };
    var value = 0;
    
    for(i=0;i<portfolio.positions.length;i++){
        num = portfolio.positions[i].size * 10/* change to current price of stock */
        value = value + num
        console.log(value)
        console.log(portfolio.positions[i])
    }
    tvDisplay.text(portfolio.name + " " +'value: '+ '$' + value)   
}
portfolioValue(portfolio);

portNameEditButtonEl.on('click', function()
{
    portfolioNameDialogEl[0].showModal();
});

function refreshPortfolioName()
{
    portfolioNameEl.text(portfolio.name);
    portfolioNameDialogInputEl.val(portfolio.name);
}

function loadPortfolio()
{
    portfolio = JSON.parse(localStorage.getItem("portfolio")) || defaultPortfolio;
    for(var position of portfolio.positions)
    {
        addPositionToList(position);
    }
}

function init()
{
    loadPortfolio();
    refreshPortfolioName();
}

init();
