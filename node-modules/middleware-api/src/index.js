/*
    index.js

    Library to make life with the beuth middleware easier.
*/

// eslint-disable-next-line fp/no-unused-expression
// require('isomorphic-fetch') // fetch polyfill for browser and node

const { Data } = require('@fntk/types')
const { Log, Pipe } = require('@fntk/utils')
// const LCMS = require('./lcms')

const log = Log('LCMS')

const BeuthConfig = Data('Beuth', {
    token: String,
    baseUrl: String
})

// getModuleGlossary :: String -> HTTPHeaders -> Number -> Promise
// const getModuleGlossary = (baseUrl, headers, id) =>
//     Pipe(
//         `${baseUrl}/beuth/vfh/openStudio/middleware/repository/glossary/modules/${id}`
//     )
//         .andThen(log.debug('URL'))
//         .andThen(url =>
//             fetch(url, {
//                 method: 'GET', // *GET, POST, PUT, DELETE, etc.
//                 // credentials: 'same-origin',
//                 headers
//             })
//         )
//         .andThen(response => response.text())
//         .value()

const Glossary = {
    UldTX0JMWg: require('./glossary/UldTX0JMWg'),
    UldTX0VJTg: require('./glossary/UldTX0VJTg'),
    UldTX0dVVg: require('./glossary/UldTX0dVVg'),
    UldTX0lVSQ: require('./glossary/UldTX0lVSQ'),
    UldTX1BSSw: require('./glossary/UldTX1BSSw')
}

const getModuleGlossary = (baseUrl, headers, id) => {
    try {
        const res = Glossary[id]
        return Promise.resolve(res.data)
    } catch (e) {
        log.error('getModuleGlossary', e)
    }
    return Promise.reject('Module not found')
}

module.exports = ({
    token,
    baseUrl = 'https://vfh143.beuth-hochschule.de'
}) => {
    const cfg = BeuthConfig({ token, baseUrl })
    log.debug('BeuthConfig', cfg)
    return {
        getModuleGlossary: moduleId => getModuleGlossary(baseUrl, {}, moduleId)

        // LCMS: LCMS({
        //     token: cfg.token,
        //     baseUrl: cfg.baseUrl,
        //     route: '',
        //     // tpAuth: ''
        //     tpAuth: ''
        // })
    }
}

/*

var Beuth = require('./src')
var Api = Beuth({ token: '' })
var ModuleId = 'UldTX0lVSQ'

Api.getModuleGlossary(ModuleId).then(res => console.log("Res:", res)).catch(e => console.log("Error", e))


*/
