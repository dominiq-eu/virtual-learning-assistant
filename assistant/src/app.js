/*
    index.js


*/
require('isomorphic-fetch')
const { Service, TelegramGateway } = require('@fntk/service')

const token = 'Your telegram bot token'
// https://core.telegram.org/bots/api#formatting-options
const parseMode = TelegramGateway.ParseMode.Markdown()

Service
    // Add Telegram
    .add(TelegramGateway({ token, parseMode }))
    .start()
