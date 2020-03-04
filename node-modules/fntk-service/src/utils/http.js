const Request = require('request')

const get = url =>
    new Promise((resolve, reject) =>
        Request(
            url,
            (error, response, body) => (error ? reject(error) : resolve(body))
        )
    )

const post = (url, body, json = true) =>
    new Promise((resolve, reject) =>
        Request(
            {
                method: 'POST',
                url,
                json,
                body
            },
            (error, response, body) => (error ? reject(error) : resolve(body))
        )
    )

// Use deepl.com for translation
//
//curl https://www2.deepl.com/jsonrpc -d '{"jsonrpc":"2.0","method":"LMT_handle_jobs","params":{"jobs":[{"kind":"default","raw_en_sentence":"hallo! wie gehts dir?"}],"lang":{"user_preferred_langs":["EN","DE"],"source_lang_computed":"DE","target_lang":""},"priority":-1},"id":15}'
//
const translate = (from, to, text) =>
    post('https://www2.deepl.com/jsonrpc', {
        jsonrpc: '2.0',
        method: 'LMT_handle_jobs',
        params: {
            jobs: [{ kind: 'default', raw_en_sentence: text }],
            lang: {
                user_preferred_langs: [from.toUpperCase(), to.toUpperCase()],
                source_lang_computed: from,
                target_lang: ''
            },
            priority: -1
        },
        // Generate random number between 1 - 100
        id: Math.floor(Math.random() * 100 + 1)
    }).then(response =>
        response.result.translations[0].beams.map(res => ({
            text: res.postprocessed_sentence,
            score: res.score
        }))
    )

module.exports = {
    get,
    post,
    translate
}
