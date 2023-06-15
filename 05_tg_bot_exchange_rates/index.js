require('dotenv').config();
const TelegramBotApi = require('node-telegram-bot-api');
const bot = require('./bot');

const tkn = process.env.TG_BOT_TOKEN;
const tgBot = new TelegramBotApi(tkn, { polling: true });

tgBot.onText(/\/start/, bot.handleStart);
tgBot.on('callback_query', bot.handleCallbackQuery);
