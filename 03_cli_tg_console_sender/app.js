const commander = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const bot = new TelegramBot('5615659005:AAGBL7SqnLeZsiwSWti46EnpbyGbG_8gjsg', {
  polling: false,
});
const chatId = '1893906697';

commander
  .command('send-message <message>')
  .description('Send a message')
  .action((message) => {
    bot
      .sendMessage(chatId, message)
      .then(() => {
        console.log('Message sent successfully!');
        process.exit();
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        process.exit(1);
      });
  });

commander
  .command('send-photo <path>')
  .description('Send a photo')
  .action((path) => {
    try {
      const photo = fs.createReadStream(path);
      bot
        .sendPhoto(chatId, photo, { contentType: 'image/jpeg' })
        .then(() => {
          console.log('Photo sent successfully!');
          process.exit();
        })
        .catch((error) => {
          console.error('Error sending photo:', error.response.body);
          process.exit(1);
        });
    } catch (error) {
      console.error('Error reading photo file:', error);
      process.exit(1);
    }
  });

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
