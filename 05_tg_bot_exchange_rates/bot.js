const { getPrivatBankRate, getMonobankRate } = require('./exchangeRate');
const { sendMessage, answerCallbackQuery } = require('node-telegram-bot-api');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 }); // Cache with a TTL of 60 seconds

function handleStart(msg) {
  const chatId = msg.chat.id;
  const message = 'Choose a currency';
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '$USD', callback_data: 'usd' },
          { text: '€EUR', callback_data: 'eur' },
        ],
      ],
    },
  };
  sendMessage(chatId, message, options);
}

function handleCallbackQuery(query) {
  const currency = query.data;
  const chatId = query.message.chat.id;

  const cachedRate = cache.get(currency);

  if (cachedRate) {
    const message = `Cached exchange rate for ${currency}: ${cachedRate}`;
    answerCallbackQuery(query.id, { text: message });
  } else {
    let exchangeRatePromise;

    if (currency === 'usd') {
      exchangeRatePromise = getPrivatBankRate();
    } else if (currency === 'eur') {
      exchangeRatePromise = getMonobankRate();
    } else {
      return;
    }

    exchangeRatePromise
      .then((rate) => {
        const message = `Exchange rate for ${currency}: ${rate}`;
        answerCallbackQuery(query.id, { text: message });
        cache.set(currency, rate);
      })
      .catch((error) => {
        const errorMessage =
          'Failed to fetch exchange rate. Please try again later.';
        answerCallbackQuery(query.id, { text: errorMessage });
      });
  }
}

module.exports = {
  handleStart,
  handleCallbackQuery,
};
