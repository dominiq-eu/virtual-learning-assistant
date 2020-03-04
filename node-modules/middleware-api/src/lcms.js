/*
    lcms.js

    Connect to the beuth middleware lcms service
*/

const { Type, Data } = require('@fntk/types')
const { Pipe, Log } = require('@fntk/utils')

const log = Log('LCMS')

//
// -- Types --
//

// Config for this module
const Config = Data('LCMSConfig', {
    baseUrl: String,
    token: String,
    route: String,
    tpAuth: String
})

// The http header we send to the server
const HTTPHeader = Data('LCMSHTTPHeader', {
    Authorization: String,
    'X-Hub': String,
    'X-Route-Id': String,
    'X-TP-Auth': String
})

// The mapping from Config() to HTTPHeader()
const Header = Type('LCMSHeader', HTTPHeader.check, config =>
    Pipe(Config(config))
        .andThen(cfg => ({
            Authorization: `Bearer ${cfg.token}`,
            'X-Hub': `${cfg.baseUrl}/hub`,
            'X-Route-Id': cfg.route,
            'X-TP-Auth': `Bearer ${cfg.tpAuth}`
        }))
        .value()
)

//
// -- Methods --
//

// getCourseGlossary :: String -> HTTPHeaders -> Number -> Promise
const getCourseGlossary = (baseUrl, headers, courseId) =>
    Pipe(`${baseUrl}/api/lcms/glossary/courses/${courseId}`)
        .andThen(log.debug('Url'))
        .andThen(url =>
            fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers
            })
        )
        .andThen(response => response.json())
        .value()

module.exports = config => {
    const cfg = Config(config)
    const h = Header(cfg)
    log.debug('Header', h)
    log.debug('Config', cfg)
    return {
        getGlossary: courseId => getCourseGlossary(cfg.baseUrl, h, courseId)
    }
}
