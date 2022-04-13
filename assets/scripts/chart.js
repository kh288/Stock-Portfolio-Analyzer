// USE THESE FOR INTRA-DAY INFORMATION
var apiKey = "2JYN2GFONTCPQSJM";
var ticker = "IBM"; 
var time = "5min"; // for intra-day intervals
var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+apiKey;
var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;

// var luxTest = luxon
// console.log(luxon.DateTime)

const startingdate = luxon.DateTime.fromRFC2822('01 Aug 2021 00:00 GMT')
const startingdate2 = luxon.DateTime.fromRFC2822('02 Aug 2021 00:00 GMT')

const data =  {
    datasets: [{
        data: [
        {
            x: startingdate.valueOf(),
            o: 1,
            h: 1.50,
            l: 0.75,
            c: 1.25
        },
        {
            x: startingdate2.valueOf(),
            o: 1.25,
            h: 2,
            l: 1.00,
            c: 1.50
        }]
        // label: ticker,
    }]
};

const config = {
    type: 'candlestick',
    data
};

const myChart = new Chart(document.getElementById('myChart'),config);

var completeData;

function getAPI3(inputLink) {
    $.ajax({
        url: inputLink,
        method: "GET"
    }).then(function (data) {
        // completeData = data;
        console.log(data["Time Series (Daily)"]);
        completeData = data["Meta Data"];
        return data;
    });
}

getAPI3(apiLinkDay);