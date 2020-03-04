// TODO: Modify node search path for modules
// See:
// https://gist.github.com/branneman/8048520
//global.include = path => require(`${__dirname}/${path}`)

//
// -- Imports --
//
const App = require('./data/app')
const Request = require('./data/request')
const Response = require('./data/response')
const HTTPGateway = require('./gateways/http')
const TelegramGateway = require('./gateways/telegram')
const NLPMiddleware = require('./middleware/nlp')
const Path = require('path')

//
// -- Config --
//
const path = Path.resolve(process.cwd()) + '/functions'
const port = 3000

//
// -- Logic --
//
const loadFunction = (req, path) => {
    const fn = require(path)
    return fn(req.payload)
}

const Router = ({ path }) => request => {
    if (Request.is(request)) {
        const fnPath = `${path}${request.path}`
        try {
            console.log('[Router] Path:', fnPath)
            console.log('[Router] Request:', request)
            return loadFunction(request, fnPath)
        } catch (e) {
            console.log('Load Function: Error: ', e)
            return Response.Error("Can't find " + fnPath)
        }
    }
    return Response.Error('Invalid request: ' + request)
}

const Service = () =>
    App()
        // Add data sources
        .add(HTTPGateway({ port }))
        // Add data manipulation pipeline steps
        .use(NLPMiddleware({ path }))
        // Add data processing
        .do(Router({ path }))

//
// -- Exports --
//
module.exports = {
    Service,
    App,
    Router: () => Router({ path }),
    Request,
    Response,
    HTTPGateway,
    TelegramGateway,
    NLPMiddleware
}
