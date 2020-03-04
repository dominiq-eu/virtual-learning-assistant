import Route from './server/data/route'

// Html tags
import { body, h1 } from './server/data/html'

// Components
import Page from './view/page'
import Card from './view/card'

// Define debugging mode
const Debug = process.env.NODE_ENV === 'debug'

// App content
const Body = ({ message = 'Unknown', values = [] }) =>
    body([
        // This is how you use simple html tags..
        h1(message),
        // ..and this is how you use components.
        Card.List(values, Card.Simple)
    ])

// The Lti Web-App
const app = (req, res, next) =>
    res.render(
        Page(
            'Friend',
            Body({
                message: 'Welcome brother',
                values: [
                    { title: 'Java FX', description: 'Oje...' },
                    { title: 'Web Companion', description: 'Why not !!' },
                    { title: 'Earthship', description: 'Do it!' }
                ]
            })
        )
    )

// LTI configuration
export default {
    // Function to resolve the credentials and authenticate the
    // LTI request.
    authenticate: key => Promise.resolve('secret'),

    // The routes provided by this web app. LTI routes needs to
    // be authenticated through the authenticate function.
    routes: [
        // Default Route
        Route.lti('/', app)
    ].concat(
        // In debug mode, add debug route.
        Debug ? [Route.get('/test', app)] : []
    )
}
