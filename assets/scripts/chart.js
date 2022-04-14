// USE THESE FOR INTRA-DAY INFORMATION
var apiKey = "2JYN2GFONTCPQSJM";
var ticker = "IBM"; 
var time = "5min"; // for intra-day intervals
var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+apiKey;
var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;
// TEST LINK: 
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMC&apikey=2JYN2GFONTCPQSJM

// function to convert data the API into a useable format for the chart
function createChartData(apiInput) {
    var data =  {
        datasets: [{
            label: ticker,
            data: []
        }]
    };
    
    // This is the main for loop to create our candle sticks from the API information
    for (i = 0; i < Object.keys(apiInput).length; i++) {
        // This creates a new object for each candle for the dataset to live
        data.datasets[0].data[i] = {
            x: luxon.DateTime.fromSQL(Object.keys(apiInput)[i]).valueOf(), 
            o: apiInput[Object.keys(apiInput)[i]]["1. open"], 
            h: apiInput[Object.keys(apiInput)[i]]["2. high"], 
            l: apiInput[Object.keys(apiInput)[i]]["3. low"], 
            c: apiInput[Object.keys(apiInput)[i]]["4. close"]
        }
    }
    // console.log(data);
    return data;
}

// 
function getAPI(inputLink) {
    $.ajax({
        url: inputLink,
        method: "GET"
    }).then(function (output) {
        // Get data from API and store it into our data variable
        var data = createChartData(output["Time Series (Daily)"]);
        // This config object is used in the chart, we're also putting chart in it
        const config = {
            type: 'candlestick',
            data
        };
        // Create a chart. Use the data we told it to use from earlier
        const myChart = new Chart(document.getElementById('myChart'),config);

        // createChartData()
        return;
    });
}

getAPI(apiLinkDay);
// grabs local storage data and displays names in the aside bar 
insertPortName();
var card = $('#chartPortfolio')
function insertPortName(){
    var portName = JSON.parse(localStorage.getItem("portfolio"));
    // test var portName = [{
    //     name: "portfolio",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]},
    //     { name: "wilbert",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]}]
    for(i=0;i<portName.length;i++){
        var div = $('<div>')
        var pn = $('<a class="hover:underline">');
        var title = portName[i].name;
        pn.text(title);
        pn.appendTo(div);
        div.appendTo(card)
    }
}