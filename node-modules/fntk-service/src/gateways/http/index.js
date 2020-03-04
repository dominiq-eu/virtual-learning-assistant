/*
    HttpGateway

    Listen to http events and feed them in the system for handling.
*/

const WebService = require('./web-service')
const Request = require('../../data/request')


// Get http requests, send them to the system for processing and
// send the response after successfull handling.
//
// gateway :: Object -> (Request -> Response | Promise<Response>) -> undefined
module.exports = cfg => fn =>
    WebService.program(request => {
        const req = Request({
            path: request.http.path,
            payload: request.data
        })
        return fn(req)
    })
