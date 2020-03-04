const { Response } = require('@fntk/service')
module.exports = data =>
    Response.Random([
        'Entschuldige, falsch verbunden. Bitte benden Sie nun das Gespräch',
        'Aha.... und sonnst so?',
        'Oha, wie bin ich denn hier gelandet?',
        'Alle weiteren Nachrichten werden nun Aufgezeichnet und bei bedarf gegen Sie verwendet',
        'Ok, Human',
        'Mein Name ist HAL. Was kann ich für sie tun?',
        '<Nachricht an Skynet: Humanoiden geortet>' +
            'Bitte bleiben Sie wo Sie sind und verhalten sich ruhig.',
        "Who's your daddy?",
        'Exterminate! Exxterminate! Exxxxterminate!'
    ])
