import Server from './server/index'
import Route from './server/data/route'

import Lti from './server/lti-middleware'
import Html from './server/data/html'

// Define the type service with default behaivor.
const Service = srv => ({
    // Configure the express app and default to build in html vdom engine.
    configure: srv.configure ? srv.configure : app => app.use(Html.engine()),

    // Handle credentials authorization. Default: key:secret
    // credentials :: Key -> Promise Secret
    authenticate: srv.authenticate
        ? srv.authenticate
        : key => {
              if (key === 'key') {
                  return Promise.resolve('secret')
              }
              return Promise.reject()
          },

    // Routes registered for this lti microservice
    // routes :: Handler[]
    routes: Array.isArray(srv.routes)
        ? srv.routes
        : [
              // Default route, lti protected
              Route.lti('/', srv)

              // Every other route is not oauth lti protected. We can use this
              // to bypass the lti authentication and access the app directly
              // for debugging and testing.
              //   Route.get('/test', srv)
          ]
})

// Create a service from ./index.html
const srvConfig = require('./index')
const service = Service(srvConfig.default ? srvConfig.default : srvConfig)

// Start server
Server.program({
    port: 7000,
    routes: service.routes,
    extraConfig: app => {
        app.use((req, res, next) => {
            // see if we defined the incoming request as route
            const r = service.routes.filter(r => Route.path(r) === req.url)
            if (r.length === 1) {
                // Check if it's an lti route and choose the lti middleware
                // or skip it.
                const route = r[0]
                const middleware = Route.isLti(route)
                    ? Lti({
                          authenticate: service.authenticate
                      })
                    : (req, res, next) => {
                          return next()
                      }

                return middleware(req, res, next)
            } else {
                return next(`Unknown route ${req.url}`)
            }
        })

        // Service configuration
        service.configure(app)
    }
})
