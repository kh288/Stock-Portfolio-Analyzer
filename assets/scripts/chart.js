const portfolioReturnEl = $("#portfolio-return");
const portfolioAlphaEl = $("#portfolio-alpha");
const portfolioBetaEl = $("#portfolio-beta");
const portfolioVolatilityEl = $("#portfolio-volatility");
const portfolioSharpeRatioEl = $("#portfolio-sharpe-ratio");

const unitlessFormatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 3
})
const percentFormatter = new Intl.NumberFormat(navigator.language, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
})

var portfolio;
const portfolioData = {};
const benchmarkValues = [];

// function to convert data the API into a useable format for the chart
function parseLineData(apiInput) {
    // This data set is the framework for the chart information
    var datasets = [{
        label: [apiInput['Meta Data']['2. Symbol'] + " | Year Data"],
        data: [],
        fill: true,
        borderColor: 'rgb(' + (Math.floor(Math.random() * 180) + 20) + ','+
                              (Math.floor(Math.random() * 180) + 20) + "," +
                              (Math.floor(Math.random() * 180) + 20) + ")",
        tension: 0.15
    }];
    // Labels are the time stamps on the bottom
    var labels = [];
    
    // 54 weeks = year
    for (i = 0; i < 54; i++) {
    // for (i = 0; i < Object.keys(apiInput).length; i++) {
        var tempDate = Object.keys(apiInput["Weekly Time Series"])[i];
        // console.log("type of Tempdate should be string" + typeoftempDate);
        labels.unshift(tempDate);
        datasets[0].data.unshift(parseFloat(apiInput["Weekly Time Series"][Object.keys(apiInput["Weekly Time Series"])[i]]['4. close']));
    }
    // Return both of the generated sets of data
    var result = [datasets, labels];
    return result;
}

var dataParsed;

// Declate our config for the chart
const config = {
    type: 'line',
    data: []
};

// Declare new chart
const lineChart = new Chart(document.getElementById('line-chart'), config);

// Retrieve data from API
function getAPI(inputLink, ticker) {
    // We need to fetch the data since it takes some time to retreive
    $.ajax({
        url: inputLink,
        method: "GET"
    }).then(function (output) {
        // Storing in global variable and in chartData
        dataParsed = parseLineData(output);
        
        const chartData = {
            datasets: dataParsed[0],
            labels: dataParsed[1]
        };

        lineChart.data = (chartData);

        lineChart.update();
        updatePortfolioStats(dataParsed[0][0].data);
    });
}


function updatePortfolioStats(values)
{
    // Portfolio return is different since it's calculated locally
    portfolioReturnEl.text(percentFormatter.format(getPortfolioReturnRate(values)));

    // Timeouts are to make sure we aren't slamming the Portfolio Optimizer API with too mary requests at once.
    // It's limited for anomymous users like us.
    //alphaRequestAjax(getPortfolioReturnRates(testBenchmarkValues), getPortfolioReturnRates(values));
    /*setTimeout(function()
    {
        betaRequestAjax(getPortfolioReturnRates(testBenchmarkValues), getPortfolioReturnRates(values));
    }, 1100);*/
    setTimeout(function()
    {
        volatilityRequestAjax(values)
    }, 1100);
    setTimeout(function()
    {
        sharpeRatioRequestAjax(values);
    }, 2200);
}

// grabs local storage data and displays names in the aside bar 
var card = $('#chartPortfolio')
function insertPortName(){
    // test var portName = [{
    //     name: "portfolio",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]},
    //     { name: "wilbert",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]}]
    for(i=0;i<portfolio.positions.length;i++){
        var div = $('<div>')
        var pn = $('<a class="hover:underline">');
        var title = portfolio.positions[i].ticker;
        pn.text(title);
        pn.attr('data',portfolio.positions[i].ticker)
        pn.appendTo(div);
        div.appendTo(card)
    }
}

//remove all content from aside info bar
function clear(){
    //$('#asideTitle').text('')
    //card.empty()
}

// add click event listener to portfolio and stats location
var ticker;
card.on('click',function(event){
    event.stopPropagation();
    //$('#asideTitle').text('STATS');
    var ticker= $(event.target).text()
    //var ticker= JSON.parse(localStorage.portfolio).positions[0].ticker
    console.log(ticker)
    //clear();
    const K = "2JYN2GFONTCPQSJM";
    //var ticker = "MSFT";
    var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&outputsize=compact&symbol="+ticker+"&apikey="+K;
    
    getAPI(apiLinkDay, ticker);
})

function init()
{
    loadPortfolio();
    insertPortName();
}

function loadPortfolio()
{
    portfolio = localStorage.getItem('portfolio');
    if(portfolio === null)
    {
        portfolio = {
            name: "Mega Stonks",
            positions : []
        };
    }
    else
    {
        portfolio = JSON.parse(portfolio);
    }
}

init();
