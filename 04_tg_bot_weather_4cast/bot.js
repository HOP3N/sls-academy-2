const tgBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new tgBot('6105075218:AAGxIDvdYSs1aWn9tN08Q8htUSHzv_mOTig', {
  polling: true,
});

// const chatId = '';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const forecastOptions = {
    reply_markup: {
      keyboard: [
        ['Forecast in Paris => at intervals of 3 hours'],
        ['Forecast in Paris => at intervals of 6 hours'],
      ],
      one_time_keyboard: true,
    },
  };
  bot.sendMessage(chatId, 'Welcome! Choose an option:', forecastOptions);
});

bot.onText(/Forecast in Paris => at intervals of (\d+) hours/, (msg, match) => {
  const chatId = msg.chat.id;
  const interval = parseInt(match[1]);
  getWeatherForecast(interval)
    .then((forecast) => {
      bot.sendMessage(chatId, forecast);
    })
    .catch((error) => {
      console.error('Error retrieving weather forecast:', error);
      bot.sendMessage(
        chatId,
        'An error occurred while retrieving the weather forecast. Please try again later.'
      );
    });
});
