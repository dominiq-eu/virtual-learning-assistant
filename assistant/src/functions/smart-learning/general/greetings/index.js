// This module is responsible to parse the telegram message
// into a internal text format to forward to a nlp module.

const { Response } = require('@fntk/service')
module.exports = data =>
    Response.Random([
        'Hallo',
        'Gut Gut',
        'Schön dich zu lesen',
        'Schön von dir zu hören',
        'Hey, was gibts?',
        'Sehr erfreut',
        '=)',
        'Sehr schön'
    ])
