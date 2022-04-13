// USE THESE FOR INTRA-DAY INFORMATION
var apiKey = "2JYN2GFONTCPQSJM";
var ticker = "AMC"; 
var time = "5min"; // for intra-day intervals
var apiLink = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ticker+"&interval="+time+"&apikey="+apiKey;
var apiLinkDay = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;

// TEST LINK: 
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMC&apikey=2JYN2GFONTCPQSJM

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
        "1. open": "18.8800",
        "2. high": "19.0100",
        "3. low": "17.2000",
        "4. close": "17.4200",
        "5. volume": "42073102"
        },
        "2022-04-11": {
        "1. open": "18.0300",
        "2. high": "18.8150",
        "3. low": "17.7200",
        "4. close": "18.7200",
        "5. volume": "37554595"
        },
        "2022-04-08": {
        "1. open": "19.7000",
        "2. high": "19.7000",
        "3. low": "18.1300",
        "4. close": "18.2400",
        "5. volume": "42674678"
        },
        "2022-04-07": {
        "1. open": "20.6300",
        "2. high": "20.9400",
        "3. low": "18.6250",
        "4. close": "19.7300",
        "5. volume": "53370520"
        },
        "2022-04-06": {
        "1. open": "20.6500",
        "2. high": "21.9188",
        "3. low": "20.0103",
        "4. close": "20.3900",
        "5. volume": "52212223"
        },
        "2022-04-05": {
        "1. open": "23.1800",
        "2. high": "23.9600",
        "3. low": "21.0000",
        "4. close": "21.2100",
        "5. volume": "41162586"
        },
        "2022-04-04": {
        "1. open": "23.4800",
        "2. high": "23.7500",
        "3. low": "21.9400",
        "4. close": "23.3100",
        "5. volume": "51536254"
        },
        "2022-04-01": {
        "1. open": "25.1300",
        "2. high": "25.2800",
        "3. low": "22.3400",
        "4. close": "23.3000",
        "5. volume": "65735714"
        },
        "2022-03-31": {
        "1. open": "24.7700",
        "2. high": "25.9200",
        "3. low": "23.2600",
        "4. close": "24.6400",
        "5. volume": "89238970"
        },
        "2022-03-30": {
        "1. open": "28.5600",
        "2. high": "29.2260",
        "3. low": "25.3500",
        "4. close": "25.6800",
        "5. volume": "95384221"
        },
        "2022-03-29": {
        "1. open": "30.0300",
        "2. high": "34.3300",
        "3. low": "26.4100",
        "4. close": "29.4400",
        "5. volume": "212293149"
        },
        "2022-03-28": {
        "1. open": "20.6100",
        "2. high": "29.7300",
        "3. low": "20.5300",
        "4. close": "29.3300",
        "5. volume": "226704130"
        },
        "2022-03-25": {
        "1. open": "19.9500",
        "2. high": "21.7000",
        "3. low": "19.7100",
        "4. close": "20.2400",
        "5. volume": "71361128"
        },
        "2022-03-24": {
        "1. open": "20.0500",
        "2. high": "20.5700",
        "3. low": "18.8600",
        "4. close": "20.2300",
        "5. volume": "68471681"
        },
        "2022-03-23": {
        "1. open": "18.7500",
        "2. high": "22.3500",
        "3. low": "18.1800",
        "4. close": "20.7400",
        "5. volume": "170142626"
        },
        "2022-03-22": {
        "1. open": "15.8800",
        "2. high": "18.9100",
        "3. low": "15.7510",
        "4. close": "18.2600",
        "5. volume": "76237430"
        },
        "2022-03-21": {
        "1. open": "15.6900",
        "2. high": "16.5500",
        "3. low": "15.2750",
        "4. close": "15.8600",
        "5. volume": "34016554"
        },
        "2022-03-18": {
        "1. open": "14.9800",
        "2. high": "15.9000",
        "3. low": "14.9700",
        "4. close": "15.8000",
        "5. volume": "31168205"
        },
        "2022-03-17": {
        "1. open": "14.9100",
        "2. high": "15.6100",
        "3. low": "14.8600",
        "4. close": "15.1900",
        "5. volume": "24130429"
        },
        "2022-03-16": {
        "1. open": "14.5100",
        "2. high": "15.6900",
        "3. low": "14.2300",
        "4. close": "15.2300",
        "5. volume": "39104464"
        },
        "2022-03-15": {
        "1. open": "13.7600",
        "2. high": "14.6917",
        "3. low": "13.1700",
        "4. close": "14.4800",
        "5. volume": "40853149"
        },
        "2022-03-14": {
        "1. open": "14.0500",
        "2. high": "14.1550",
        "3. low": "12.9000",
        "4. close": "13.5600",
        "5. volume": "32959762"
        },
        "2022-03-11": {
        "1. open": "15.3100",
        "2. high": "15.4000",
        "3. low": "14.2650",
        "4. close": "14.3000",
        "5. volume": "29202850"
        },
        "2022-03-10": {
        "1. open": "15.6300",
        "2. high": "15.8100",
        "3. low": "14.7800",
        "4. close": "15.3200",
        "5. volume": "25666513"
        },
        "2022-03-09": {
        "1. open": "15.7200",
        "2. high": "16.2700",
        "3. low": "15.4250",
        "4. close": "15.7100",
        "5. volume": "25206370"
        },
        "2022-03-08": {
        "1. open": "15.1500",
        "2. high": "16.2600",
        "3. low": "14.3801",
        "4. close": "15.3900",
        "5. volume": "35370432"
        },
        "2022-03-07": {
        "1. open": "16.9100",
        "2. high": "17.1000",
        "3. low": "14.8995",
        "4. close": "15.2100",
        "5. volume": "39507295"
        },
        "2022-03-04": {
        "1. open": "18.0500",
        "2. high": "18.3200",
        "3. low": "16.3500",
        "4. close": "16.5700",
        "5. volume": "39628154"
        },
        "2022-03-03": {
        "1. open": "18.6300",
        "2. high": "18.7000",
        "3. low": "17.7975",
        "4. close": "18.0600",
        "5. volume": "24825943"
        },
        "2022-03-02": {
        "1. open": "18.0100",
        "2. high": "18.6901",
        "3. low": "17.3100",
        "4. close": "18.5300",
        "5. volume": "35038168"
        },
        "2022-03-01": {
        "1. open": "19.0000",
        "2. high": "19.4300",
        "3. low": "17.8300",
        "4. close": "18.3200",
        "5. volume": "44003031"
        },
        "2022-02-28": {
        "1. open": "17.9950",
        "2. high": "19.3400",
        "3. low": "17.6100",
        "4. close": "18.8600",
        "5. volume": "42772331"
        },
        "2022-02-25": {
        "1. open": "17.7100",
        "2. high": "17.8600",
        "3. low": "16.5300",
        "4. close": "17.6600",
        "5. volume": "36944111"
        },
        "2022-02-24": {
        "1. open": "14.9700",
        "2. high": "17.7700",
        "3. low": "14.9600",
        "4. close": "17.6800",
        "5. volume": "54405749"
        },
        "2022-02-23": {
        "1. open": "16.7300",
        "2. high": "17.0200",
        "3. low": "15.6200",
        "4. close": "15.7300",
        "5. volume": "30155909"
        },
        "2022-02-22": {
        "1. open": "17.3600",
        "2. high": "18.1300",
        "3. low": "16.1100",
        "4. close": "16.4700",
        "5. volume": "42612091"
        },
        "2022-02-18": {
        "1. open": "18.9900",
        "2. high": "19.2000",
        "3. low": "17.6850",
        "4. close": "17.9000",
        "5. volume": "31953540"
        },
        "2022-02-17": {
        "1. open": "19.4800",
        "2. high": "20.2100",
        "3. low": "18.4700",
        "4. close": "18.9400",
        "5. volume": "40130240"
        },
        "2022-02-16": {
        "1. open": "19.3500",
        "2. high": "20.5800",
        "3. low": "19.2600",
        "4. close": "19.6700",
        "5. volume": "49444604"
        },
        "2022-02-15": {
        "1. open": "18.0500",
        "2. high": "19.5500",
        "3. low": "17.9600",
        "4. close": "19.4800",
        "5. volume": "39851977"
        },
        "2022-02-14": {
        "1. open": "18.8300",
        "2. high": "19.3600",
        "3. low": "17.6600",
        "4. close": "17.7500",
        "5. volume": "46106739"
        },
        "2022-02-11": {
        "1. open": "18.6200",
        "2. high": "19.6600",
        "3. low": "18.3310",
        "4. close": "18.8100",
        "5. volume": "68425903"
        },
        "2022-02-10": {
        "1. open": "17.9000",
        "2. high": "20.9600",
        "3. low": "17.8500",
        "4. close": "18.5900",
        "5. volume": "98957390"
        },
        "2022-02-09": {
        "1. open": "16.3000",
        "2. high": "19.0000",
        "3. low": "16.1400",
        "4. close": "18.9400",
        "5. volume": "75867368"
        },
        "2022-02-08": {
        "1. open": "14.9000",
        "2. high": "16.8200",
        "3. low": "14.6500",
        "4. close": "16.4300",
        "5. volume": "51272462"
        },
        "2022-02-07": {
        "1. open": "15.6200",
        "2. high": "16.0000",
        "3. low": "14.6800",
        "4. close": "14.9100",
        "5. volume": "29755158"
        },
        "2022-02-04": {
        "1. open": "15.0000",
        "2. high": "15.7000",
        "3. low": "14.7400",
        "4. close": "15.3500",
        "5. volume": "32396547"
        },
        "2022-02-03": {
        "1. open": "15.0400",
        "2. high": "15.8500",
        "3. low": "14.6500",
        "4. close": "14.8700",
        "5. volume": "39215123"
        },
        "2022-02-02": {
        "1. open": "16.5500",
        "2. high": "17.0650",
        "3. low": "15.3800",
        "4. close": "15.4200",
        "5. volume": "48626044"
        },
        "2022-02-01": {
        "1. open": "18.1500",
        "2. high": "18.7100",
        "3. low": "16.5200",
        "4. close": "16.8600",
        "5. volume": "124427691"
        },
        "2022-01-31": {
        "1. open": "15.1400",
        "2. high": "16.2500",
        "3. low": "15.0000",
        "4. close": "16.0600",
        "5. volume": "41447901"
        },
        "2022-01-28": {
        "1. open": "14.6000",
        "2. high": "15.2500",
        "3. low": "13.4000",
        "4. close": "15.0600",
        "5. volume": "53951582"
        },
        "2022-01-27": {
        "1. open": "16.1100",
        "2. high": "16.5900",
        "3. low": "14.3950",
        "4. close": "14.5200",
        "5. volume": "50530189"
        },
        "2022-01-26": {
        "1. open": "16.2100",
        "2. high": "18.1550",
        "3. low": "15.6500",
        "4. close": "15.9400",
        "5. volume": "76722875"
        },
        "2022-01-25": {
        "1. open": "15.8900",
        "2. high": "16.6200",
        "3. low": "15.5500",
        "4. close": "16.0200",
        "5. volume": "42434571"
        },
        "2022-01-24": {
        "1. open": "16.2400",
        "2. high": "17.2900",
        "3. low": "14.2300",
        "4. close": "16.6400",
        "5. volume": "82538968"
        },
        "2022-01-21": {
        "1. open": "17.7700",
        "2. high": "18.5600",
        "3. low": "16.2200",
        "4. close": "17.9700",
        "5. volume": "65185653"
        },
        "2022-01-20": {
        "1. open": "18.5900",
        "2. high": "20.1600",
        "3. low": "17.9500",
        "4. close": "18.0700",
        "5. volume": "51078730"
        },
        "2022-01-19": {
        "1. open": "18.5300",
        "2. high": "19.4200",
        "3. low": "18.0300",
        "4. close": "18.3200",
        "5. volume": "34815977"
        },
        "2022-01-18": {
        "1. open": "19.7900",
        "2. high": "19.8879",
        "3. low": "17.8000",
        "4. close": "18.8400",
        "5. volume": "55472468"
        },
        "2022-01-14": {
        "1. open": "20.3300",
        "2. high": "21.0800",
        "3. low": "19.5100",
        "4. close": "20.5700",
        "5. volume": "56996644"
        },
        "2022-01-13": {
        "1. open": "22.6500",
        "2. high": "23.1500",
        "3. low": "20.5250",
        "4. close": "20.6600",
        "5. volume": "41004986"
        },
        "2022-01-12": {
        "1. open": "22.8600",
        "2. high": "23.3598",
        "3. low": "22.0500",
        "4. close": "22.7200",
        "5. volume": "27472092"
        },
        "2022-01-11": {
        "1. open": "22.4000",
        "2. high": "23.7500",
        "3. low": "22.0900",
        "4. close": "22.7900",
        "5. volume": "35870758"
        },
        "2022-01-10": {
        "1. open": "22.4200",
        "2. high": "22.8703",
        "3. low": "21.2500",
        "4. close": "22.7800",
        "5. volume": "37784001"
        },
        "2022-01-07": {
        "1. open": "23.6100",
        "2. high": "24.3000",
        "3. low": "22.4400",
        "4. close": "22.9900",
        "5. volume": "49480990"
        },
        "2022-01-06": {
        "1. open": "22.9600",
        "2. high": "23.7700",
        "3. low": "20.8000",
        "4. close": "22.4600",
        "5. volume": "59112722"
        },
        "2022-01-05": {
        "1. open": "25.1700",
        "2. high": "25.3000",
        "3. low": "22.3618",
        "4. close": "22.7500",
        "5. volume": "45172063"
        },
        "2022-01-04": {
        "1. open": "26.6700",
        "2. high": "26.6700",
        "3. low": "24.6400",
        "4. close": "25.4900",
        "5. volume": "33347928"
        },
        "2022-01-03": {
        "1. open": "27.4150",
        "2. high": "28.1300",
        "3. low": "26.4200",
        "4. close": "26.5200",
        "5. volume": "26810811"
        },
        "2021-12-31": {
        "1. open": "28.7600",
        "2. high": "29.4000",
        "3. low": "27.1100",
        "4. close": "27.2000",
        "5. volume": "23149043"
        },
        "2021-12-30": {
        "1. open": "27.9100",
        "2. high": "30.1900",
        "3. low": "27.6835",
        "4. close": "28.9400",
        "5. volume": "36056434"
        },
        "2021-12-29": {
        "1. open": "27.7450",
        "2. high": "28.3500",
        "3. low": "26.6200",
        "4. close": "27.9500",
        "5. volume": "30983388"
        }
}

// var jsonLength = keys(jsonObject).length;
var testArrayThing = [];

// We use .fromSQL to convert into the proper INPUT time we're getting from the API

const testTime = luxon.DateTime.fromSQL('2021-11-18');
const testTime2 = luxon.DateTime.fromSQL('2021-11-19');

// x: Object.keys(jsonObject)[0],
// o: jsonObject[Object.keys(jsonObject)[0]]["1. open"],
// h: jsonObject[Object.keys(jsonObject)[0]]["2. high"],
// l: jsonObject[Object.keys(jsonObject)[0]]["3. low"],
// c: jsonObject[Object.keys(jsonObject)[0]]["4. close"]

// data.datasets[0].data[0] = Object.keys(jsonObject)[0];
// x = Object.keys(jsonObject)[i];
// o = jsonObject[Object.keys(jsonObject)[0]]["1. open"],
// h = jsonObject[Object.keys(jsonObject)[0]]["2. high"],
// l = jsonObject[Object.keys(jsonObject)[0]]["3. low"],
// c = jsonObject[Object.keys(jsonObject)[0]]["4. close"]

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
            x: luxon.DateTime.fromSQL(Object.keys(jsonObject)[i]).valueOf(), 
            o: jsonObject[Object.keys(jsonObject)[0]]["1. open"], 
            h: jsonObject[Object.keys(jsonObject)[0]]["2. high"], 
            l: jsonObject[Object.keys(jsonObject)[0]]["3. low"], 
            c: jsonObject[Object.keys(jsonObject)[0]]["4. close"]
        }
    }
    // console.log(data);
    return data;
}

const data = createChartData(jsonObject);
// chartData.datasets[0].data[0]

// const data =  {
//     datasets: [{
//         label: ticker,
//         data: [{
//             x: testTime.valueOf(),
//             o: 1,
//             h: 1.50,
//             l: 0.75,
//             c: 1.25
//         },{
//             x: testTime2.valueOf(),
//             o: 1.25,
//             h: 2,
//             l: 1.00,
//             c: 1.50
//         }]
//         // label: ticker,
//     }]
// };

// console.log(data);

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