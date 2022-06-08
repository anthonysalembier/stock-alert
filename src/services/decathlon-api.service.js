import axios from 'axios';

const BASE_URL = 'https://www.decathlon.fr/fr/ajax/nfs';

/**
 * Get stocks from Decathlon stocks API
 *
 * @param {Array<string>} skuIds
 * @returns {Promise<AxiosResponse<any>>}
 */
function getOnlineStocks(skuIds) {
    if (!skuIds || !skuIds.length) {
        throw 'Invalid parameter';
    }

    const urlSkuIds = skuIds
        .slice(1, skuIds.length)
        .reduce(
            (previous, current) => {
                return `${previous},${current}`;
            },
            skuIds[0]
        );

    const url = `${BASE_URL}/stocks/online?skuIds=${urlSkuIds}`;

    console.log(`Calling: ${url}`);
    return axios.get(url)
}

export default {
    getOnlineStocks
};
