const axios = require('axios');

const PRIVATBANK_API_URL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const MONOBANK_API_URL = 'https://api.monobank.ua/bank/currency';

async function getPrivatBankRate() {
  try {
    const response = await axios.get(PRIVATBANK_API_URL);
    const data = response.data;

    // Find the exchange rate for USD
    const usdRate = data.find((currency) => currency.ccy === 'USD');
    if (usdRate) {
      return usdRate.sale;
    }

    throw new Error('Exchange rate for USD not found');
  } catch (error) {
    throw new Error('Failed to fetch PrivatBank exchange rate');
  }
}

async function getMonobankRate() {
  try {
    const response = await axios.get(MONOBANK_API_URL);
    const data = response.data;

    // Find the exchange rate for EUR
    const eurRate = data.find(
      (currency) =>
        currency.currencyCodeA === 978 && currency.currencyCodeB === 980
    );
    if (eurRate) {
      return eurRate.rateBuy;
    }

    throw new Error('Exchange rate for EUR not found');
  } catch (error) {
    throw new Error('Failed to fetch Monobank exchange rate');
  }
}

module.exports = {
  getPrivatBankRate,
  getMonobankRate,
};
