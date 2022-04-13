// TEST LINK: 
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMC&apikey=2JYN2GFONTCPQSJM
const K = "2JYN2GFONTCPQSJM";
var ticker = "MSFT";
var time = "5min"; // for intra-day intervals
var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+K;
var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+K;
// GLOBALLY STORE CHART DATA
var chartData;

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

// function to fetch the API key and execute the chart as well since we're waiting for the data
function getAPI(inputLink) {
    // We need to fetch the data since it takes some time to retreive
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
        // store data from API into a global variable
        chartData = data;
        // Create the chart. Use the data we told it to use from earlier
        const myChart = new Chart(document.getElementById('myChart'),config);

        // createChartData()
        return;
    });
}

// run the function with our api link arguement
getAPI(apiLinkDay);