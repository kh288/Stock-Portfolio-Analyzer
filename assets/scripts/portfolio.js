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

// Delete stock position from portfolio
portfolioListEl.on("click", ".delete-position", function()
{
    var deletedPosition = $(this).parents(".stock-position");
    var deletedPositionIndex = deletedPosition.index();
    portfolio.positions.splice(deletedPositionIndex, 1);

    deletedPosition.remove();
    //portfolioValue(portfolio);
});

// Edit stock position in portfolio via dialog box
portfolioListEl.on("click", ".edit-position", function()
{
    var positionToEdit = portfolio.positions[$(this).parents(".stock-position").index()]; // Gets the position corresponding the the position whose edit button was pressed
    // Prefill dialog contents
    $("#enter-position-dialog-submit").val("edit");
    $("#enter-position-dialog-ticker-input").val(positionToEdit.ticker);
    $("#enter-position-dialog-size-input").val(positionToEdit.size);

    portfolioPositionDialogEl.data("edit-position-index", $(this).parents(".stock-position").index()) // Stashes the index of the position being edited into the dialog box as a data attribute
    portfolioPositionDialogEl[0].showModal();
});

// Add stock position to portfolio via dialog box
addPositionEl.on("click", function()
{
    $("#enter-position-dialog-submit").val("ok");
    portfolioPositionDialogEl[0].showModal();
});

// Save stock portfolio to local storage
saveButtonEl.on("click", function()
{
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    console.log(portfolio);
});

// Delete portfolio from local storage
deleteButtonEl.on("click", function()
{
    localStorage.removeItem("portfolio");
});

// Process portfolio name dialog box input
portfolioNameDialogEl.on("close", function()
{
    if(portfolioNameDialogEl[0].returnValue === "ok")
    {
        portfolio.name = portfolioNameDialogInputEl.val();
    }
    refreshPortfolioName();
});

// Process portfolio stock position dialog box input
portfolioPositionDialogEl.on("close", function()
{
    if(portfolioPositionDialogEl[0].returnValue === "ok") // Dialog returns from add position
    {
        var newPosition = getNewPosition(portfolioPositionDialogTickerInputEl.val(), portfolioPositionDialogSizeInputEl.val());
        portfolio.positions.push(newPosition);
        addPositionToList(newPosition);
    }
    else if(portfolioPositionDialogEl[0].returnValue === "edit") // Dialog returns from edit position
    {
        var positionToEditIndex = portfolioPositionDialogEl.data("edit-position-index");
        var positionToEdit = portfolio.positions[positionToEditIndex];
        editPosition(positionToEdit, portfolioPositionDialogTickerInputEl.val(), portfolioPositionDialogSizeInputEl.val());
        refreshPortfolioPosition(positionToEditIndex);
    }
    // Reset dialog
    portfolioPositionDialogTickerInputEl.val("");
    portfolioPositionDialogSizeInputEl.val("");
});

// Create and return new stock position
function getNewPosition(ticker, size)
{
    return {
        ticker: ticker,
        size: size
    };
}

// Add stock position to portfolio display
function addPositionToList(position)
{
    const positionEl = $("<div class='flex-auto p-3 gap-2 grid grid-cols-4 divide-x text-md divide-transparent shrink justify-items-center stock-position'>");

    const tickerEl = $("<h3 class='ticker'>");
    tickerEl.text(position.ticker);
    const amountEl = $("<p class='size'>");
    amountEl.text("Amount: " + position.size);
    const buttonPanelEl = $("<div>");
    const editButtonEl = $("<button class='edit-position rounded bg-slate-800' type='button'>");
    editButtonEl.text("Edit Position");
    const deleteButtonEl = $("<button class='delete-position rounded bg-slate-800 m-1' type='button'>");
    deleteButtonEl.text("Delete Position");
    
    tickerEl.appendTo(positionEl);
    amountEl.appendTo(positionEl);
    buttonPanelEl.appendTo(positionEl);
    editButtonEl.appendTo(buttonPanelEl);
    deleteButtonEl.appendTo(buttonPanelEl);

    positionEl.appendTo(portfolioListEl);
    //portfolioValue(portfolio);
}

// Set specified stock position ticker and size values to new values
function editPosition(position, newTicker, newSize)
{
    position.ticker = newTicker;
    position.size = newSize;
}

// Edit portfolio name via dialog box
portNameEditButtonEl.on('click', function()
{
    portfolioNameDialogEl[0].showModal();
});

// Refresh portfolio name data on display
function refreshPortfolioName()
{
    portfolioNameEl.text(portfolio.name);
    portfolioNameDialogInputEl.val(portfolio.name);
    //function below refreshes display of name
    //portfolioValue(portfolio)
}

// Refresh the given stock position data on display
function refreshPortfolioPosition(positionIndex)
{
    var portfolioPosition = portfolio.positions[positionIndex];
    var portfolioPositionEl = portfolioListEl.children().eq(positionIndex);
    console.log(portfolioPositionEl);
    portfolioPositionEl.find(".ticker").text(portfolioPosition.ticker);
    portfolioPositionEl.find(".size").text("Amount: " + portfolioPosition.size);
}

// Loads portfolio data from local storage
function loadPortfolio()
{
    portfolio = JSON.parse(localStorage.getItem("portfolio")) || defaultPortfolio;
    for(var position of portfolio.positions)
    {
        addPositionToList(position);
    }
}

// Initialize position page
function init()
{
    loadPortfolio();
    refreshPortfolioName();
}

init();
