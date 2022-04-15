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
        datasets[0].data.unshift(apiInput["Weekly Time Series"][Object.keys(apiInput["Weekly Time Series"])[i]]['4. close']);
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
function getAPI(inputLink) {
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

        updatePortfolioStats();
        lineChart.update();
    });
}


function updatePortfolioStats()
{
    // Portfolio return is different since it's calculated locally
    portfolioReturnEl.text(percentFormatter.format(getPortfolioReturnRate(testPortfolioValues)));

    // Timeouts are to make sure we aren't slamming the Portfolio Optimizer API with too mary requests at once.
    // It's limited for anomymous users like us.
    alphaRequestAjax(getPortfolioReturnRates(testBenchmarkValues), getPortfolioReturnRates(testPortfolioValues));
    setTimeout(function()
    {
        betaRequestAjax(getPortfolioReturnRates(testBenchmarkValues), getPortfolioReturnRates(testPortfolioValues));
    }, 1100);
    setTimeout(function()
    {
        volatilityRequestAjax(testPortfolioValues)
    }, 2200);
    setTimeout(function()
    {
        sharpeRatioRequestAjax(testPortfolioValues);
    }, 3300);
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
    
    getAPI(apiLinkDay);
})

function init()
{
    loadPortfolio();
    insertPortName();
    getPortfolioValues();
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

//var index;
function getPortfolioValues()
{
    for(var i = 0; i < portfolio.positions.length; i++)
    {
        //portfolioData[portfolio.positions[i].ticker] = [];
        setTimeout(function(index)
        {
            sendQuery(portfolio.positions[index].ticker);
        }, i * 150, i);
    }

    function sendQuery(tickerA)
    {
        const K = "2JYN2GFONTCPQSJM";
        $.ajax({
            url: "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + tickerA + "&apikey=" + K,
            method: "GET"
        }).then(function (output) {
            output = output["Weekly Time Series"];
            var outputKeys = Object.keys(output);
            outputKeys = outputKeys.slice(0, 54);
            var portfolioValues = []
            for (var i = 0; i < outputKeys.length; i++)
            {
                var ele = output[outputKeys[i]];
                ele = ele["4. close"];
                portfolioValues.push(parseFloat(ele));
            }
            portfolioValues.reverse();

            portfolioData[tickerA] = portfolioValues;
            console.log("Queried " + tickerA + "...");
            if(isFinishedQuerying())
            {
                console.log("Finished!")
                console.log(portfolioData);
            }
        });
    }

    function isFinishedQuerying()
    {
        console.log(Object.keys(portfolioData).length);
        console.log(portfolio.positions.length);
        return Object.keys(portfolioData).length === portfolio.positions.length;
    }
}

init();
