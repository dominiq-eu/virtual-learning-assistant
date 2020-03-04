/*
    app.js

    Example of the configuration of an web-service
*/
const { Service, TelegramGateway } = require('@fntk/service')

const token = '012345678:abcdefghijklmnopqrstufvxyzABCDEFGHI'
// https://core.telegram.org/bots/api#formatting-options
const parseMode = TelegramGateway.ParseMode.Markdown()

Service
    //
    .add(TelegramGateway({ token, parseMode }))
    .start()
