const portfolioOptimizerBaseApiUrl =  "https://api.portfoliooptimizer.io/v1";
const portfolioOptimizerAlphaUrl = "/portfolio/analysis/alpha";
const portfolioOptimizerBetaUrl = "/portfolio/analysis/beta";
const portfolioOptimizerVolatilityUrl = "/portfolio/analysis/volatility";
const portfolioOptimizerSharpeRatioUrl = "/portfolio/analysis/sharpe-ratio";

const testBenchmarkValues = [1000, 1040, 1070, 990, 800, 1150];
const testPortfolioValues = [1000, 1050, 1090, 900, 890, 1200];

/**
 * Given a set of portfolio values at equally-spaced time intervals, computes the return rate for the entire interval
 * @param {*} portfolioValues an array of numbers representing portfolio total values
 * @returns an number representing the return rates for the interval of the input array
 */
function getPortfolioReturnRate(portfolioValues)
{
    var portfolioReturn = portfolioValues[portfolioValues.length - 1] - portfolioValues[0];
    portfolioReturn /= portfolioValues[0];
    return portfolioReturn;
}

/**
 * Given a set of portfolio values at equally-spaced time intervals, computes the return rates (change in value relative to the initial value) for each time period
 * @param {*} portfolioValues an array of numbers representing portfolio total values
 * @returns an array of numbers representing the return rates between time periods of the input array
 */
function getPortfolioReturnRates(portfolioValues)
{
    var portfolioReturns = [];
    for(var i = 0; i < portfolioValues.length - 1; i++)
    {
        var portfolioReturn = portfolioValues[i + 1] - portfolioValues[i];
        portfolioReturn /= portfolioValues[0];
        portfolioReturns.push(portfolioReturn);
    }
    return portfolioReturns;
}

/**
 * Given a set of portfolio return rates, computes the average return rate for the entire period measured
 * @param {*} portfolioReturns an array of numbers representing portfolio return rates
 * @returns a numbers representing the average return rate over the time period of the input array
 */
function getPortfolioAverageReturn(portfolioReturns)
{
    var portfolioAverageReturn = 0;
    for(var portfolioReturn of portfolioReturns)
    {
        portfolioAverageReturn += portfolioReturn;
    }
    portfolioAverageReturn /= portfolioReturns.length;
    return portfolioAverageReturn;
}

// Create and return a request for alpha data to the Portfolio Optimizer API
function createAlphaRequestData(benchmarkReturnRates, portfolioReturnRates)
{
    return JSON.stringify({
        benchmarkReturns: benchmarkReturnRates,
        riskFreeRate: 0.01,
        portfolios: [
            {
                portfolioReturns: portfolioReturnRates
            }
        ]
    });
}

// Create and return a request for beta data to the Portfolio Optimizer API
function createBetaRequestData(benchmarkReturnRates, portfolioReturnRates)
{
    return JSON.stringify({
        benchmarkReturns: benchmarkReturnRates,
        riskFreeRate: 0.01,
        portfolios: [
            {
                portfolioReturns: portfolioReturnRates
            }
        ]
    });
}

// Create and return a request for volatility data to the Portfolio Optimizer API
function createVolatilityRequestData(portfolioValues)
{
    return JSON.stringify({
        portfolios: [
            {
                portfolioValues: portfolioValues
            }
        ]
    });
}

// Create and return a request for sharpe ratio data to the Portfolio Optimizer API
function createSharpeRatioRequestData(portfolioValues)
{
    return JSON.stringify({
        riskFreeRate: 0.01,
        portfolios: [
            {
                portfolioValues: portfolioValues
            }
        ]
    });
}

// Send API request, wait for response, and update alpha value display
function alphaRequestAjax(benchmarkReturns, portfolioReturns)
{
    $.ajax({
        url: portfolioOptimizerBaseApiUrl + portfolioOptimizerAlphaUrl,
        method: "POST",
        contentType: 'application/json; charset=UTF-8',
        data: createAlphaRequestData(benchmarkReturns, portfolioReturns)
    }).then(function (output) {
        portfolioAlphaEl.text(percentFormatter.format(output.portfolios[0].portfolioAlpha));
    });
}

// Send API request, wait for response, and update beta value display
function betaRequestAjax(benchmarkReturns, portfolioReturns)
{
    $.ajax({
        url: portfolioOptimizerBaseApiUrl + portfolioOptimizerBetaUrl,
        method: "POST",
        contentType: 'application/json; charset=UTF-8',
        data: createBetaRequestData(benchmarkReturns, portfolioReturns)
    }).then(function (output) {
        portfolioBetaEl.text(unitlessFormatter.format(output.portfolios[0].portfolioBeta));
    });
}

// Send API request, wait for response, and update volatility value display
function volatilityRequestAjax(portfolioValues)
{
    $.ajax({
        url: portfolioOptimizerBaseApiUrl + portfolioOptimizerVolatilityUrl,
        method: "POST",
        contentType: 'application/json; charset=UTF-8',
        data: createVolatilityRequestData(portfolioValues)
    }).then(function (output) {
        portfolioVolatilityEl.text(percentFormatter.format(output.portfolios[0].portfolioVolatility));
    });
}

// Send API request, wait for response, and update sharpe ratio value display
function sharpeRatioRequestAjax(portfolioValues)
{
    $.ajax({
        url: portfolioOptimizerBaseApiUrl + portfolioOptimizerSharpeRatioUrl,
        method: "POST",
        contentType: 'application/json; charset=UTF-8',
        data: createSharpeRatioRequestData(portfolioValues)
    }).then(function (output) {
        portfolioSharpeRatioEl.text(unitlessFormatter.format(output.portfolios[0].portfolioSharpeRatio));
    });
}
