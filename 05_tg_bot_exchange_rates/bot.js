const exchangeRate = require('./exchangeRate');

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
  tgBot.sendMessage(chatId, message, options);
}

function handleCallbackQuery(query) {
  const currency = query.data;
  const chatId = query.message.chat.id;

  const cachedRate = exchangeRate.getCachedRate(currency);

  if (cachedRate) {
    const message = `Cached exchange rate for ${currency}: ${cachedRate}`;
    tgBot.answerCallbackQuery(query.id, { text: message });
  } else {
    exchangeRate
      .getCachedRate(currency)
      .then((rate) => {
        const message = `Exchange rate for ${currency}: ${rate}`;
        tgBot.answerCallbackQuery(query.id, { text: message });
        exchangeRate.cacheRate(currency, rate);
      })
      .catch((error) => {
        const errorMessage =
          'Failed to fetch exchange rate. Please try again later.';
        tgBot.answerCallbackQuery(query.id, { text: errorMessage });
      });
  }
}

module.exports = {
  handleStart,
  handleCallbackQuery,
};
