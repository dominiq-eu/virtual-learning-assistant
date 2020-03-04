import Route from './server/data/route'

// All html tags are functions you import here
// @See https://github.com/ohanhi/hyperscript-helpers
import { html, body, ul, li, h1 } from './server/data/html'

const Debug = process.env.NODE_ENV === 'debug'

// The html page we're sending to the user
const Html = ({ message = 'Default', values = [] }) =>
    html([
        head([
            title(name),
            link({
                rel: 'stylesheet',
                type: 'text/css',
                href: '/semantic.min.css'
            }),
            script({
                src: 'https://code.jquery.com/jquery-3.1.1.min.js',
                integrity:
                    'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
                crossorigin: 'anonymous'
            }),
            script({ src: '/semantic.min.js' })
        ]),
        Body({ message, values })
    ])

const Body = ({ message, values }) =>
    // Body of our app
    body([
        // Show a message
        h1(message),
        // and show how to use javascript to operate on lists, etc..
        ul('Values:', values.map(s => li(s)))
    ])

const handler = (req, res, next) => {
    console.log('Handler')
    return res.render(
        Html({
            title: 'Friend',
            message: 'Welcome brother',
            values: ['Java FX', 'Web Companion', 'Earthship']
        })
    )
}

// The lti app
export default {
    // Function to resolve the credentials and authenticate the
    // LTI request.
    authenticate: key => Promise.resolve('secret'),

    // The routes provided by this web app. LTI routes needs to
    // be authenticated through the authenticate function.
    routes: [
        // Default Route
        Route.lti('/', handler)
    ].concat(
        // In debug mode, add debug route.
        Debug ? [Route.get('/test', handler)] : []
    )
}
