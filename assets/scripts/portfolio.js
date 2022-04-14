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
    var deletedPosition = $(this).parents(".stock-position");
    var deletedPositionIndex = deletedPosition.index();
    portfolio.positions.splice(deletedPositionIndex, 1);

    deletedPosition.remove();
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
    const positionEl = $("<div class='flex p-5 grid grid-cols-5 divide-x text-md divide-transparent shrink stock-position'>");

    const tickerEl = $("<h3>");
    tickerEl.text(position.ticker);
    const amountEl = $("<p>");
    amountEl.text("Amount: " + position.size);
    const priceEl = $("<p>");
    priceEl.text("Current Price: $165.75 (-4.34 -2.55%)");
    const positionPriceEl = $("<p>");
    positionPriceEl.text("Position Value: $8,375.00 (-$217.00)");
    const buttonPanelEl = $("<div>");
    const editButtonEl = $("<button class='edit-position' type='button'>");
    editButtonEl.text("Edit Position");
    const deleteButtonEl = $("<button class='delete-position' type='button'>");
    deleteButtonEl.text("Delete Position");
    
    tickerEl.appendTo(positionEl);
    amountEl.appendTo(positionEl);
    priceEl.appendTo(positionEl);
    positionPriceEl.appendTo(positionEl);
    buttonPanelEl.appendTo(positionEl);
    editButtonEl.appendTo(buttonPanelEl);
    deleteButtonEl.appendTo(buttonPanelEl);

    positionEl.appendTo(portfolioListEl);
}

//button function to save name from textarea box
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
