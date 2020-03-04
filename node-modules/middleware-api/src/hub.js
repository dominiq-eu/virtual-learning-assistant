/*
    lcms.js

    Connect to the beuth middleware lcms service
*/

const { Type, Data } = require('@fntk/types')
const { Pipe, Log } = require('@fntk/utils')

const log = Log('Hub')

//
// -- Types --
//

// Config for this module
const Config = Data('LCMSConfig', {
    baseUrl: String,
    token: String,
    route: String,
    tpAuth: String
})

// The http header we send to the server
const HTTPHeader = Data('LCMSHTTPHeader', {
    Authorization: String,
    'X-Hub': String,
    'X-Route-Id': String,
    'X-TP-Auth': String
})

// The mapping from Config() to HTTPHeader()
const Header = Type('LCMSHeader', HTTPHeader.check, config =>
    Pipe(Config(config))
        .andThen(cfg => ({
            Authorization: `Bearer ${cfg.token}`,
            'X-Hub': `${cfg.baseUrl}/hub`,
            'X-Route-Id': cfg.route,
            'X-TP-Auth': `Bearer ${cfg.tpAuth}`
        }))
        .value()
)

//
// -- Methods --
//

/*
//
// Ask for a list of instances to login to.
// @return {Promise} The promise pass a list of clients on success.
//
getLoginInstances() {
    const url = '/consumers/'
    const that = thisauth
    const return_promise = new Promise((resolve, reject) => {
        that.hub
            .get(url)
            .then(response => {
                // Update the token.
                that.token = response.token || that.token

                // Create a list of Client objects from the enrolments.
                const client_list = response.instEnrolments
                    .map(e => {
                        log.debug('Enrollment: ', e)
                        return Route.create(e)
                    })
                    .filter(route => route.active)
                resolve(client_list)
            })
            .catch(that._error(reject, url))
    })
    return return_promise
}

//
//  @param user   {string} The username to authenticate.
//  @param pass   {string} The password to authenticate the user with.
//  @return {Promise} The session token.
//
getSessionToken(user, pass) {
    const url = '/routes/info'
    let info = undefined
    const return_promise = new Promise((resolve, reject) => {
        // Get Route for selected client.
        this.hub
            .get(url, this.route_header)
            .then(response => {
                log.debug('GetSessionToken: /routes/info:', response)
                info = response

                // Assume we just use this client for the rest
                // of the process.
                this.client = Route.setCompatUrls(
                    info.endpoint.host,
                    this.client
                )
                // this.client.route = route
                log.debug('Client:', this.client)

                // Get Authentication script.
                return ajax({
                    url: response.security.clientAuthScriptURL,
                    dataType: 'script'
                })
            })
            .catch(this._error(reject, url))
            .then(() => {
                log.debug('GetSessionToken: Do Authentication.')
                return wrapBeuthAuthentication(info, user, pass)
            })
            .then(response => {
                log.debug('GetSessionToken: Token:', response)
                // Restore jquery intance after.
                // jQuery.noConflict();
                if (response.data && response.data.token) {
                    resolve(response.data.token)
                } else {
                    reject(
                        'Benutzername oder Passwort falsch. ' +
                            'Bitte überprüfen Sie Ihre Eingabe und ' +
                            'versuchen Sie es erneut.'
                    )
                }
            })
            .catch(this._error(reject, 'Authentication'))
    })
    return return_promise
}
*/

// getCourseGlossary :: String -> HTTPHeaders -> Number -> Promise
const getCourseGlossary = (baseUrl, headers, courseId) =>
    Pipe(`${baseUrl}/api/lcms/glossary/courses/${courseId}`)
        .andThen(log.debug('Url'))
        .andThen(url =>
            fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers
            })
        )
        .andThen(response => response.json())
        .value()

module.exports = config => {
    const cfg = Config(config)
    const h = Header(cfg)
    log.debug('Header:', h)
    log.debug('Config:', cfg)
    return {
        getGlossary: courseId => getCourseGlossary(cfg.baseUrl, h, courseId)
    }
}
