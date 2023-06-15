const { getPrivatBankRate, getMonobankRate } = require('./exchangeRate');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

const token = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function handleStart(msg) {
  const chatId = msg.chat.id;
  const message = 'Choose a currency:';
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
  bot.sendMessage(chatId, message, options);
}

function handleCallbackQuery(query) {
  const currency = query.data;
  const chatId = query.message.chat.id;

  const cachedRate = cache.get(currency);

  if (cachedRate) {
    const message = `Cached exchange rate for ${currency}: ${cachedRate}`;
    bot.answerCallbackQuery(query.id, { text: message });
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
        bot.answerCallbackQuery(query.id, { text: message });
        cache.set(currency, rate);
      })
      .catch((error) => {
        const errorMessage =
          'Failed to fetch exchange rate. Please try again later.';
        bot.answerCallbackQuery(query.id, { text: errorMessage });
      });
  }
}

module.exports = {
  handleStart,
  handleCallbackQuery,
};
