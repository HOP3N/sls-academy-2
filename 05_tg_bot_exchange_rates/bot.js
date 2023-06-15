const { getPrivatBankRate, getMonobankRate } = require('./exchangeRate');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

const token = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function handleStart(msg) {
  const chatId = msg.chat.id;
  const message = 'Choose an option:';
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '💰 Exchange Rates', callback_data: 'exchange' },
          { text: '🌤️ Weather Forecast', callback_data: 'weather' },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, message, options);
}

function handleCallbackQuery(query) {
  const option = query.data;
  const chatId = query.message.chat.id;

  if (option === 'exchange') {
    const exchangeMessage = 'Choose a currency:';
    const exchangeOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '$USD', callback_data: 'usd' },
            { text: '€EUR', callback_data: 'eur' },
          ],
        ],
      },
    };
    bot.sendMessage(chatId, exchangeMessage, exchangeOptions);
  } else if (option === 'weather') {
    // Implement weather forecast logic here
    const weatherMessage = 'Enter the location for weather forecast:';
    const weatherOptions = {
      reply_markup: {
        force_reply: true,
      },
    };
    bot.sendMessage(chatId, weatherMessage, weatherOptions);
  }
}

function handleWeatherInput(msg) {
  const chatId = msg.chat.id;
  const location = msg.text;
  const weatherForecast = 'The weather forecast for ' + location + ' is ...';
  bot.sendMessage(chatId, weatherForecast);
}

module.exports = {
  handleStart,
  handleCallbackQuery,
  handleWeatherInput,
};
