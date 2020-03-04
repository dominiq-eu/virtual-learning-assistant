#! /usr/bin/env node
/*
    index.js

    Commandline interface to the learning assistant. Mainly used to for
    development to provide a local offline interface to test the assistant
    with.
*/

//
// -- Config --
//
// eslint-disable-next-line
let Url = 'http://localhost:8000/smart-learning'

//
// -- Helper --
//
require('isomorphic-fetch') // eslint-disable-line
const Readline = require('readline')

const prompt = name => `\n\n${name}\n> `
const reply = msg => {
    const p = prompt('bot')
    console.log(`${p}${msg}`)
    return msg
}
// Main app logic
const App = (d = x => x, steps = []) => ({
    addStep: f => App(d, steps.concat([f])),
    defaultStep: f => App(f, steps),

    // eslint-disable-next-line fp/no-nil
    run: fn =>
        // eslint-disable-next-line fp/no-rest-parameters
        fn((...args) => {
            let step = d // eslint-disable-line fp/no-let
            if (steps.length > 0) {
                step = steps.slice(0, 1)[0]
                steps = steps.slice(1)
            }
            return step.apply({}, args)
        })
})

//
// -- Main --
//

// eslint-disable-next-line fp/no-unused-expression
App()
    .addStep((input, line) => {
        Url = line.length > 0 ? line : Url
        input.setPrompt(prompt('You'))
        input.prompt()
        return Url
    })
    // .addStep((input, line) => {
    //     Config.user = line
    //     reply(`Welcome ${Config.user}! Can I help you?`)
    //     input.setPrompt(prompt(Config.user))
    //     input.prompt()
    //     return Config
    // })
    .defaultStep((input, line) => {
        const url = `${Url}?sentence=` + encodeURI(line)
        console.log('GET: ', url)
        return fetch(url)
            .then(response => response.json())
            .then(response => {
                reply(JSON.stringify(response, 0, 4))
                input.prompt()
                return response
            })
            .catch(e => {
                reply('Oha: Network Error: ', e)
                input.prompt()
                return e
            })
    })
    .run(step => {
        // Startup the chat interface
        console.log('\nTest Chat\n\n')

        const input = Readline.createInterface(process.stdin, process.stdout)
        input.setPrompt(`Host [${Url}]: `)
        input.prompt()
        input // eslint-disable-line fp/no-unused-expression
            .on('line', line => {
                if (line === 'exit') {
                    input.close()
                }
                return step(input, line)
            })
            .on('close', () => process.exit(0))
        return true
    })
