// This module is responsible to parse the telegram message
// into a internal text format to forward to a nlp module.

const { Response } = require('@fntk/service')
const answer = `
Hallo!

Hier ist dein Virtueller Lern Assistent, komm regelmäßig vorbei um von neuen Updates zu erfahren.
`

module.exports = data => Response.Success(answer)
