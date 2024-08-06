
const TelegramBot = require('node-telegram-bot-api');

const token = '7181822540:AAGodgHk1FKHb-LsdXTXdyBc5lUxKGa7Ezs'

const webAppUrl = 'https://guileless-pie-234a2c.netlify.app';
const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {

        await bot.sendMessage(chatId, 'created a button was called: to fill form', {
            reply_markup: {
                keyboard: [
                    [{ text: 'to fill form', web_app: { url: webAppUrl + '/form' } }]
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

//прием данных в боте
    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)


            await bot.sendMessage(chatId, 'Your country is:' + data?.country)
            await bot.sendMessage(chatId, 'Your street is:' + data?.street)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Thanks for attention')
            }, 3000)
        } catch (e) {
            console.log(e)
        }

    }

})
