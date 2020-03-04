/*
    Request

    Provides a data structure that represents an incoming request.
*/

const { Union, Result } = require('@fntk/types')
const { Random } = require('@fntk/utils')

const RandomOkType = Result.Ok.derive(val_list => Random(val_list))

const Response = Union('Response', {
    Success: Result.Ok,
    Error: Result.Err,
    Random: RandomOkType
})

module.exports = Response
