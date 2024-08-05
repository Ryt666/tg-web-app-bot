
const TelegramBot = require('node-telegram-bot-api');

const token = '7181822540:AAGodgHk1FKHb-LsdXTXdyBc5lUxKGa7Ezs'

const webAppUrl = 'https://guileless-pie-234a2c.netlify.app/';
const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {

        await bot.sendMessage(chatId, 'created a button was called: to fill form', {
            reply_markup: {
                keyboard: [
                    [{ text: 'to fill form', web_app: { url: webAppUrl } }]
                ]
            }
        });


        await bot.sendMessage(chatId, 'go to our shop', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'make an order', web_app: { url: webAppUrl } }]
                ]
            }
        });
    }

})
