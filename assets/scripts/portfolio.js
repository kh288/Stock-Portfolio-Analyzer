const portfolioEl = $("#portfolio");
const portfolioListEl = $("#portfolio-list");
const addPositionEl = $("#button-add-position");
const saveButtonEl = $("#button-save-portfolio");
const deleteButtonEl = $("#button-delete-portfolio");

portfolioListEl.on("click", ".delete-position", function()
{
    alert(this);
    $(this).parent().remove();
});

addPositionEl.on("click", function()
{
    const positionEl = $("<div>");

    const tickerEl = $("<h3>");
    tickerEl.text("AAPL");
    const amountEl = $("<p>");
    amountEl.text("Amount: 50");
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
});