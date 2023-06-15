const { getExchangeRate, getCachedRate, cacheRate } = require('./exchangeRate');
const { sendMessage, answerCallbackQuery } = require('node-telegram-bot-api');

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

  const cachedRate = getCachedRate(currency);

  if (cachedRate) {
    const message = `Cached exchange rate for ${currency}: ${cachedRate}`;
    answerCallbackQuery(query.id, { text: message });
  } else {
    getExchangeRate(currency)
      .then((rate) => {
        const message = `Exchange rate for ${currency}: ${rate}`;
        answerCallbackQuery(query.id, { text: message });
        cacheRate(currency, rate);
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
