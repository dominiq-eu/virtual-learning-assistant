/*
    Request

    Provides a data structure that represents an incoming request.
*/

const { Type, Data, StringType } = require('@fntk/types')

const RequestType = Data('Request', {
    path: String,
    payload: Object
})

RequestType.NLP = Type(
    'NLP',
    v => RequestType.is(v) && StringType.is(v.payload.sentence),
    val => ({
        path: '/',
        payload: { sentence: StringType(val) }
    })
)

// RequestType.NLP = RequestType.derive(val => ({
//     path: '/',
//     payload: { sentence: StringType(val) }
// }))

// const Request = Union('Request', {
//     Request: RequestType,
//     NLP: NLPRequestType
// })

module.exports = RequestType
