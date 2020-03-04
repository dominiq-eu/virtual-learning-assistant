'use strict'

/*
    echo incoming data
*/

const { Response } = require('@fntk/service')

module.exports = data => {
    console.log('/echo: Data: ', data)
    return Response.Success(data)
}
