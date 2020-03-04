//
// -- Model --
//

// Route :: Route | null -> Route
export const Route = r =>
    Object.assign(
        {
            method: 'unknown',
            path: '',
            type: 'unknown',
            handler: (req, res) => false
        },
        r
    )

//
// -- Getter --
//

// method :: Route -> Method
export const method = route => Route(route).method

// path :: Route -> String
export const path = route => Route(route).path

// handler :: Route -> Function
export const handler = route => Route(route).handler

// isLti :: Route -> Boolean
export const isLti = route => route.type === 'lti'

//
// -- Factories --
//

// get :: String -> Function -> Route
export const get = (path, handler) =>
    Route({
        method: 'get',
        type: 'get',
        path,
        handler
    })

// post :: String -> Function -> Route
export const post = (path, handler) =>
    Route({
        method: 'post',
        type: 'post',
        path,
        handler
    })

// lti :: Function -> Route
export const lti = (path, handler) =>
    Route({
        method: 'post',
        type: 'lti',
        path,
        handler
    })

// lti :: Function -> Route
export const socket = (path, handler) =>
    Route({
        method: 'socket',
        type: 'socket',
        path,
        handler
    })

export default {
    // Internal Constructor
    Route,

    // Type Constructor
    get,
    post,
    lti,
    socket,

    // Getter
    method,
    path,
    handler,

    // Helper
    isLti
}
