// USE THESE FOR INTRA-DAY INFORMATION
var apiKey = "2JYN2GFONTCPQSJM";
var ticker = "IBM"; 
var time = "5min"; // for intra-day intervals
var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+apiKey;
var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;

// var luxTest = luxon
// console.log(luxon.DateTime)


// for (const key in jsonObject) {
//     (`${key}: ${jsonObject[key]}`);
// }

// function parseJsonInput(json) {
//     return JSON.parse(json);
// }
// console.log(jsonObject)

// This is the big request from the API to store in.
let inputAPIDataArray;

// Object.keys(jsonObject)[0] = '2022-04-07'
// jsonObject[Object.keys(jsonObject)[0]]
var jsonObject = {
    "2022-04-12": {
    "1. open": "126.4200",
    "2. high": "127.3400",
    "3. low": "125.5835",
    "4. close": "125.9800",
    "5. volume": "2670077"
    },
    "2022-04-11": {
    "1. open": "127.9500",
    "2. high": "128.1750",
    "3. low": "126.1800",
    "4. close": "126.3700",
    "5. volume": "3202545"
    },
    "2022-04-08": {
    "1. open": "128.0100",
    "2. high": "128.7800",
    "3. low": "127.2700",
    "4. close": "127.7300",
    "5. volume": "3143309"
    },
    "2022-04-07": {
    "1. open": "128.8700",
    "2. high": "129.2499",
    "3. low": "126.7300",
    "4. close": "128.5500",
    "5. volume": "3538317"
    }
}

// var jsonLength = keys(jsonObject).length;
var testArrayThing = [];

// We use .fromSQL to convert into the proper INPUT time we're getting from the API

const testTime = luxon.DateTime.fromSQL('2021-11-18');
const testTime2 = luxon.DateTime.fromSQL('2021-11-19');

function createChartData(apiInput) {
    var data = {
        datasets: [{
            label: ticker,
            data: [{
                x: Object.keys(jsonObject)[0],
                o: jsonObject[Object.keys(jsonObject)[0]]["1. open"],
                h: jsonObject[Object.keys(jsonObject)[0]]["2. high"],
                l: jsonObject[Object.keys(jsonObject)[0]]["3. low"],
                c: jsonObject[Object.keys(jsonObject)[0]]["4. close"]
            }]
        }]
    };


    console.log("DATA: ");
    console.log(data);
    // var temp = keys(apiInput);
    // STORING NAME IN FIRST SLOT
    // data.datasets[0].data[0] = Object.keys(jsonObject)[0];
    // for (i = 0; i < Object.keys(apiInput).length; i++) {
    //         data.datasets[0].data[0] = Object.keys(jsonObject)[0];
    // }
    return data;
}

const chartData = createChartData(jsonObject);
// chartData.datasets[0].data[0]

const data =  {
    datasets: [{
        label: ticker,
        data: [{
            x: testTime.valueOf(),
            o: 1,
            h: 1.50,
            l: 0.75,
            c: 1.25
        },{
            x: testTime2.valueOf(),
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

function getAPI(inputLink) {
    $.ajax({
        url: inputLink,
        method: "GET"
    }).then(function (data) {
        // completeData = data;
        // console.log(data["Time Series (Daily)"]);
        inputAPIDataArray = data["Time Series (Daily)"];
        return data;
    });
}

getAPI(apiLinkDay);