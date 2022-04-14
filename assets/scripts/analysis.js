/**
 * Given a set of portfolio values at equally-spaced time intervals, computes the return ratess (change in value relative to the initial value) for each time period
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