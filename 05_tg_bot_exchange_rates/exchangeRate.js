const NodeCache = require('node-cache');
const axios = require('axios');

const cache = new NodeCache();

async function getExchangeRate(currency) {
  try {
    const response = await axios.get(`API_URL/${currency}`);
    const rate = response.data.rate;

    return rate;
  } catch (error) {
    throw new Error('Failed to fetch exchange rate');
  }
}
function getCachedRate(currency) {
  return cache.get(currency);
}
function cacheRate(currency, rate) {
  cache.set(currency, rate, CACHE_TTL);
}

module.exports = {
  getExchangeRate,
  getCachedRate,
  cacheRate,
};
