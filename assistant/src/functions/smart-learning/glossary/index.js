const { Response } = require('@fntk/service')
const { Let, Pipe, Log } = require('@fntk/utils')

const Beuth = require('middleware-api')
const Api = Beuth({ token: '' })

const TriggerWords = require('./function.json').sentences.de
const log = Log('/smart-learning/glossary')

const modules = [
    'UldTX0JMWg',
    'UldTX0VJTg',
    'UldTX0dVVg',
    'UldTX0lVSQ',
    'UldTX1BSSw'
]

const removeTags = string =>
    string
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()

const flatten = (arr, result = []) => {
    // eslint-disable-next-line fp/no-unused-expression
    arr.forEach(value => {
        if (Array.isArray(value)) {
            flatten(value, result)
        } else {
            result.push(value)
        }
        return true
    })
    return result
}

const parseTerm = (sentence, wordsToRemove = []) =>
    wordsToRemove.length > 0
        ? parseTerm(
              sentence
                  .toLowerCase()
                  .replace(wordsToRemove[0].toLowerCase(), ''),
              wordsToRemove.splice(1)
          )
        : sentence.trim()

const searchTerm = term =>
    Promise.all(
        modules.map(id =>
            Promise.resolve(
                Api.getModuleGlossary(id).then(g =>
                    g.filter(e =>
                        e.name.toLowerCase().includes(term.toLowerCase())
                    )
                )
            )
        )
    ).then(flatten)

module.exports = data =>
    Let({
        term: log.debug('ParseTerm', parseTerm(data.sentence, TriggerWords))
    }).In(
        ({ term }) =>
            !!term
                ? searchTerm(term)
                      .then(
                          answer =>
                              answer.length > 0
                                  ? Promise.resolve(answer)
                                  : Promise.reject(
                                        new Error(
                                            `Leider weiß ich auch nicht was *${term}* bedeutet.`
                                        )
                                    )
                      )
                      .then(log.debug('Answer'))
                      .then(answer => answer[0].description.html)
                      .then(removeTags)
                      .then(Response.Success)
                      .catch(Response.Error)
                : Response.Error(
                      `Du musst mir noch sagen welchen Begriff ich für dich Definieren soll.`
                  )
    )
