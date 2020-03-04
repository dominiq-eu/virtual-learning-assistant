// This module is responsible to parse the telegram message
// into a internal text format to forward to a nlp module.

const { Response } = require('@fntk/service')
module.exports = data =>
    Response.Random([
        'Gern geschehen',
        'Schönen Gruß',
        'Immer wieder gerne',
        '=)',
        'Bitte',
        'Bitte'
    ])
