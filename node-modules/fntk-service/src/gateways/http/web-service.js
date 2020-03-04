// Express
const Express = require('express')
const Compression = require('compression')
const BodyParser = require('body-parser')

// Node
const Url = require('url')
const Http = require('http')

const { Data } = require('@fntk/types')
const { Log } = require('@fntk/utils')

const log = Log('WebService')

//
// -- Types
//

const HttpHeader = Data('HTTPHeader', {
    method: String,
    url: String,
    path: String,
    headers: Object
})

const HttpRequest = Data('HTTPRequest', {
    http: HttpHeader,
    data: Object
})

//
// -- Helper
//
const isObject = obj => obj !== null && typeof obj === 'object'
const toPromise = p => (p.then ? p : Promise.resolve(p))
const toString = response =>
    isObject(response) ? JSON.stringify(response, 0, 4) : response
const isObjEmpty = obj => Boolean(Object.keys(obj).length)

// app :: ()
const app = fn =>
    Express()
        .use(Compression()) // Compression support
        .use(BodyParser.json()) // Automatic parsing of the response body
        .use(BodyParser.urlencoded({ extended: true }))
        // Catch route
        .all('*', (req, res, next) => {
            const url = Url.parse(req.url, true)
            log.debug('URL', url)
            const request = HttpRequest({
                http: HttpHeader({
                    method: req.method,
                    headers: req.headers,
                    url: req.url,
                    path: url.pathname
                }),
                data: isObjEmpty(url.query) ? url.query : req.body
            })
            log.debug('Request', request)
            const handler = r => toPromise(fn(r))
            return handler(request)
                .then(toString)
                .then(response => {
                    log.debug('[WebService] Response: ', response)
                    res.write(response)
                    return res.end()
                })
        })

// program :: { Int, [ Route ]}
const program = fn => {
    // Configuration
    const port = 8000
    const prog = app(fn)

    Http.createServer(prog).listen(port, () =>
        log.debug(`Listening on: 0.0.0.0:${port}`)
    )
    return port
}

module.exports = { program }
