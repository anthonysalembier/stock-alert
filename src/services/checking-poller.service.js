import constants from '../config/constants.js';
import decathlonApiService from './decathlon-api.service.js';
import facebookGraphApi from './facebook-graph-api.service.js';

let stockCheckingInterval;
let availableStocks = [];

/**
 * Start interval (every REFRESH_DELAY minutes) to check stocks on given skuIds.
 *
 * @param {Array<string>} skuIds
 */
function startStockChecking(skuIds) {
    stockCheckingInterval = setInterval(async () => {
        try {
            const stocks = await decathlonApiService.getOnlineStocks(skuIds);

            if (!stocks) {
                console.warn(`No results found with given skuIds (${skuIds})`);
            } else {
                console.log('Stocks result:', stocks.data);
            }

            checkStocks(stocks.data);
        } catch (error) {
            console.error(error);
        }
    }, constants.REFRESH_DELAY * 60 * 1000);
}

/**
 * Stop checking interval
 */
function stopStockChecking() {
    if (stockCheckingInterval) {
        clearInterval(stockCheckingInterval);
    }
}

/**
 * Send notification if stocks are available
 *
 * @param {Object} stocks
 */
function checkStocks(stocks) {
    const newStocks = [];
    const stocksToNotify = [];

    Object.keys(stocks).forEach((id) => {
        if (stocks.hasOwnProperty(id)) {
            const stockOnline = stocks[id].stockOnline;

            if (stockOnline > 0) {
                newStocks.push({
                    id,
                    stockOnline,
                });

                if (!findStock(availableStocks, id)) {
                    console.log(`New available stock found: {${id}: ${stockOnline}}`);

                    stocksToNotify.push({
                        id,
                        stockOnline,
                    });
                }
            }
        }
    });

    availableStocks = newStocks;

    if (stocksToNotify.length) {
        notify(stocksToNotify);
    } else {
        console.log('No new available stocks found.');
    }
}

/**
 * Find a stock by id in the given list, undefined if not found.
 *
 * @param {Array<Object>} stocks
 * @param {String} id
 * @returns {*}
 */
function findStock(stocks, id) {
    return stocks.find((stock) => {
        return stock.id === id;
    });
}

/**
 * Send notification for given stocks
 *
 * @param {Array<Object>} stocks
 */
async function notify(stocks) {
    let message = 'Nouveaux stocks disponibles :\n';
    stocks.forEach((stock) => {
        // Example: L (4036478): 72 disponibles
        message += `\n ${constants.getSize[stock.id]} (${stock.id}) : ${stock.stockOnline} disponible${stock.stockOnline > 1 ? 's' : ''}`
    })

    console.log('Notifying for new stock available:\n', message);
    try {
        await facebookGraphApi.postStockAvailableTemplate();
    } catch (error) {
        console.error(error);
    }
}

export default {
    startStockChecking,
    stopStockChecking,
};
