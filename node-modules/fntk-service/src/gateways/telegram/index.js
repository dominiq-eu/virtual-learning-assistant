/*
    telegram.js

    Get updates from telegram.
*/

const Request = require('../../data/request')
const Response = require('../../data/response')
const TeleBot = require('telebot')
const { Union, StringType } = require('@fntk/types')
const { Log, Pipe } = require('@fntk/utils')

const log = Log('TelegramGateway')

//
// -- Helper --
//
const toPromise = p => (p.then ? p : Promise.resolve(p))

//
// -- Types --
//

const ParseMode = Union('TelegramParseMode', {
    Text: StringType.of('Text'),
    Markdown: StringType.of('Markdown'),
    HTML: StringType.of('HTML')
})

// On token:
// https://core.telegram.org/bots/api#authorizing-your-bot
//
// On parseMode:
// https://core.telegram.org/bots/api#formatting-options
//
const TelegramGateway = function({ token, parseMode = ParseMode.Text() }) {
    log.debug('parseMode', parseMode)
    ParseMode.check(parseMode)
    log.debug('ParseMode', parseMode)
    return fn => {
        const bot = new TeleBot({
            token,
            polling: {
                interval: 1000
            }
        })

        // eslint-disable-next-line fp/no-unused-expression
        bot.on('text', msg =>
            // Create NLP Request and send it to the system to
            // produce a response.
            Pipe(Request.NLP(msg.text))
                .andThen(req => toPromise(fn(req)))
                // Get Response from the system guaranteed as Promise<Response>
                .value()
                // .. and handle it.
                .then(log.debug('Response'))
                .then(response =>
                    Response.case(response, {
                        Success: () => response.value,
                        Error: () => response.error
                    })
                )
                .then(log.debug('Answer'))
                .then(answer =>
                    bot.sendMessage(msg.from.id, answer, {
                        parseMode,
                        replyToMessage: msg.message_id
                    })
                )
                .catch(log.error('Error'))
                .catch(e =>
                    bot.sendMessage(msg.from.id, 'Internal Error', {
                        replyToMessage: msg.message_id
                    })
                )
        )
        return bot.start()
    }
}
TelegramGateway.ParseMode = ParseMode

module.exports = TelegramGateway
