const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5336424335:AAGk0uyo0qqRCrKgvr2J7GrYKK1S0MF8878';
const webAppUrl = 'https://ornate-selkie-c27577.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'the button bottom fulled form', {
            reply_markup: {
                keyboard: [
                    [{text: 'to full form', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Visit our online store, go below', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'make an order', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'thanks for attention')
            await bot.sendMessage(chatId, 'your country : ' + data?.country);
            await bot.sendMessage(chatId, 'your street: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, ' all information you will get in this chat');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'success purchase',
            input_message_content: {
                message_text: `you purchased goods for the amount ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))