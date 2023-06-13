const tgBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const OWAPIKey = process.env.API_KEY;
const city = 'Paris';

const bot = new tgBot(botToken, { polling: true });

const forecastOptions = {
  reply_markup: {
    keyboard: [
      ['Forecast in Paris => at intervals of 3 hours'],
      ['Forecast in Paris => at intervals of 6 hours'],
    ],
    one_time_keyboard: true,
  },
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
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

async function getWeatherForecast(interval) {
  try {
    const forecastData = await fetchWeatherForecast();
    const formattedForecast = formatForecast(forecastData, interval);
    return formattedForecast;
  } catch (error) {
    throw error;
  }
}

async function fetchWeatherForecast() {
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OWAPIKey}`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

function formatForecast(forecastData, interval) {
  const forecastList = forecastData.list;
  const formattedForecast = [];

  for (let i = 0; i < forecastList.length; i += interval) {
    const forecast = forecastList[i];
    const timestamp = forecast.dt_txt;
    const temperature = (forecast.main.temp - 273.15).toFixed(2);
    const weatherDescription = forecast.weather[0].description;

    const formattedMessage = `Timestamp: ${timestamp}\nTemperature: ${temperature}°C\nWeather: ${weatherDescription}\n`;
    formattedForecast.push(formattedMessage);
  }

  const finalForecast = formattedForecast.join('\n');
  return finalForecast;
}
