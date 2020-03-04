// Express
import Express from 'express'
import Compression from 'compression'
import BodyParser from 'body-parser'

// Node
import Http from 'http'

// WebSocket support
import SocketIO from 'socket.io'

// Data
import Route from './data/route'

// program :: { Int, [ Route ]}
export const program = ({ port, extraConfig, routes }) => {
    // Our server middleware
    const app = Express()

    // Compression support
    app.use(Compression())

    // Automatic parsing of the response body
    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))

    // Static files support
    app.use(Express.static('static'))

    // Give the express app to the calling entity for some extra configuration.
    extraConfig(app)

    // Register routes
    routes
        .filter(r => Route.method(r) === 'get' || Route.method(r) === 'post')
        .map(Route.Route)
        .forEach(r => {
            app[Route.method(r)](Route.path(r), Route.handler(r))
        })

    // Initiate server
    const server = Http.createServer(app)
    const io = SocketIO(server)
    server.listen(port, () => {
        console.log(`Server: Listening on port: ${port}`)
    })

    io.on('connection', socket => {
        console.log('WebSocket: Connected')

        // Register sockets
        routes.filter(r => Route.method(r) === 'socket').forEach(r => {
            console.log('WebSocket: Register:', Route.path(r))
            const handler = Route.handler(r)
            socket.on(Route.path(r), req => {
                console.log('WebSocket: On:', Route.path(r), ':', req)
                handler(req, data => {
                    console.log('WebSocket: Reply: ', data)
                    socket.emit(Route.path(r), data)
                })
            })
        })

        socket.on('disconnect', () => {
            console.log('WebSocket: Disconnected')
        })
    })
}

export default { program }
