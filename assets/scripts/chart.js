// TEST LINK: 
// https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=2JYN2GFONTCPQSJM
// var time = "5min"; // for intra-day intervals
// var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+K;
// const K = "2JYN2GFONTCPQSJM";
// var ticker="MSFT";
// var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&outputsize=compact&symbol="+ticker+"&apikey="+K;
// GLOBALLY STORE CHART DATA
// var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=2JYN2GFONTCPQSJM";

// function to convert data the API into a useable format for the chart
function parseLineData(apiInput) {
    var datasets = [{
        label: apiInput['Meta Data']['2. Symbol'] + " | Year Data",
        data: [],
        fill: true,
        borderColor: 'rgb(' + (Math.floor(Math.random() * 180) + 20) + ','+
                              (Math.floor(Math.random() * 180) + 20) + "," +
                              (Math.floor(Math.random() * 180) + 20),
        tension: 0.15
    }];
    var labels = [];
    
    // 54 weeks = year
    for (i = 0; i < 54; i++) {
    // for (i = 0; i < Object.keys(apiInput).length; i++) {
        var tempDate = Object.keys(apiInput["Weekly Time Series"])[i];
        // console.log("type of Tempdate should be string" + typeoftempDate);
        labels.unshift(tempDate);
        datasets[0].data.unshift(apiInput["Weekly Time Series"][Object.keys(apiInput["Weekly Time Series"])[i]]['4. close']);
    }
    
    var result = [datasets, labels];

    return result;
}

var apiData;
var dataParsed;

async function getAPI(inputLink) {
    // We need to fetch the data since it takes some time to retreive
    $.ajax({
        url: inputLink,
        method: "GET"
    }).then(function (output) {
        // chartData = output["Time Series (Daily)"];
        // console.log(output);
        // chartData = output;
        // console.log(dataTrimmed);
        // apiData = output["Time Series (Daily)"];
        apiData = output["Weekly Time Series"];

        // dataParsed = parseLineData(output["Time Series (Daily)"]);
        dataParsed = parseLineData(output/* ["Weekly Time Series"] */);

        // console.log(Object.keys(output["Monthly Time Series"]))
    

        // parseLineData(dataSets)
        
        const chartData = {
            labels: dataParsed[1],
            datasets: dataParsed[0]
        };

        // console.log(data);

        const config = {
            type: 'line',
            data: chartData
        };

        const lineChart = new Chart(document.getElementById('line-chart'), config);
        // parseLineData()
        return config;
    });
}

//getAPI(apiLinkDay);


// function parseCandleData(apiInput) {
//     // This is the main for loop to create our candle sticks from the API information
//     for (i = 0; i < Object.keys(apiInput).length; i++) {
//         // This creates a new object for each candle for the dataset to live
//         data.datasets[0].data[i] = {
//             x: luxon.DateTime.fromSQL(Object.keys(apiInput)[i]).valueOf(),
//             o: apiInput[Object.keys(apiInput)[i]]["1. open"],
//             h: apiInput[Object.keys(apiInput)[i]]["2. high"],
//             l: apiInput[Object.keys(apiInput)[i]]["3. low"],
//             c: apiInput[Object.keys(apiInput)[i]]["4. close"]
//         }
//     }
//     console.log(data);
// }

// function to fetch the API key and execute the chart as well since we're waiting for the data
// function getAPI(inputLink) {
//     // We need to fetch the data since it takes some time to retreive
//     $.ajax({
//         url: inputLink,
//         method: "GET"
//     }).then(function (output) {
//         // Get data from API and store it into our data variable
//         console.log(output);
//         var data = createChartData(output["Weekly Adjusted Time Series"]);
//         console.log(data);
//         // This config object is used in the chart, we're also putting chart in it
//         const config = {
//             type: 'candlestick',
//             data
//         };
//         // store data from API into a global variable
//         chartData = data;
//         // Create a chart. Use the data we told it to use from earlier
//         const myChart = new Chart(document.getElementById('myChart'),config);

//         // createChartData()
//         return;
//     });
// }

// function createChartData(apiInput) {
//     var data =  {
//         datasets: [{
//             label: ticker,
//             data: []
//         }]
//     };

// function createLineChart() {
//     const labels = Utils.months({count: 7});

//     const data = {
//       labels: labels,
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }]
//     };

//     const config = {
//         type: 'line',
//         data: data
//     };
//     const lineChart = new Chart(document.getElementById('line-chart'),config);
//     return lineChart;
// }

// run the function with our api link arguement

// sum of all closing dates for stock and consolidate it into chart

// const data = {
//   labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
//   datasets: [{
//     label: 'AAPL',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.25
//   }, {
//     label: 'MFST',
//     data: [45, 39, 40, 51, 26, 45, 30],
//     fill: false,
//     borderColor: '#336533',
//     tension: 0.25
//   }, {
//     label: 'TOTAL',
//     data: [100, 139, 140, 151, 126, 145, 130],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.25
//   }

// ]
// };
// const config = {
//     type: 'line',
//     data: data
// };
// const lineChart = new Chart(document.getElementById('line-chart'),config);

// grabs local storage data and displays names in the aside bar 
//insertPortName();
var card = $('#chartPortfolio')
function insertPortName(){
    var portName = JSON.parse(localStorage.getItem('portfolio'));
    // test var portName = [{
    //     name: "portfolio",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]},
    //     { name: "wilbert",positions:[{ticker: "AAPL", size: 100},{ticker: "TSLA",size: 15}]}]
    for(i=0;i<portName.positions.length;i++){
        var div = $('<div>')
        var pn = $('<a class="hover:underline">');
        var title = portName.positions[i].ticker;
        pn.text(title);
        pn.attr('data',portName.positions[i].ticker)
        pn.appendTo(div);
        div.appendTo(card)
    }
}
insertPortName();
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
//display current name of portfolio and value
// function portfolioValue(portfolio,currentPrice){
//     var value = 0;
//     var portName = JSON.parse(localStorage.getItem("portfolio"));
//     //if statement to prevent error if portfolio is undefined
//     if (portfolio){
//     for(i=0;i<portfolio.positions.length;i++){
//         num = portfolio.positions[i].size * 10/* change to current price of stock */
//         value += num
//     }
//     var tvDisplay = $('<div>')
//     tvDisplay.text(portfolio.name + " " +'value: '+ '$' + value)  } 
//     tvDisplay.appendTo(card);