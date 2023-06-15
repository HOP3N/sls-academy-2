require('dotenv').config();
const TelegramBotApi = require('node-telegram-bot-api');
const { handleStart, handleCallbackQuery } = require('./bot');

const tkn = process.env.TG_BOT_TOKEN;
const tgBot = new TelegramBotApi(tkn, { polling: true });

tgBot.onText(/\/start/, handleStart);
tgBot.on('callback_query', handleCallbackQuery);

console.log('Bot is running...');
