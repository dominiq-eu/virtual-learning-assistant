import Lti from 'ims-lti'
import Task from 'data.task'
import { isNil } from 'ramda'

//
// -- Lti Commands --
//
const Session = session =>
    Object.assign(
        {
            key: '',
            secret: '',
            params: {}
        },
        session
    )

// startLti :: Request -> Task Error Request
const startLti = req =>
    // Detect if there is a payload present that would indicate an LTI launch.
    new Task(
        (reject, resolve) =>
            req.method === 'POST' &&
            !isNil(req.body) &&
            req.body.lti_message_type == 'basic-lti-launch-request'
                ? resolve(req)
                : reject()
    )

// authenticateLti :: (String -> Promise) -> Request -> Task Error Session
const authenticateLti = callback => req =>
    // Try to get the consumerKey from the body and use the credentials
    // callback to retrieve the according secret to validate the request
    // using oauth.
    new Task((reject, resolve) => {
        const key = req.body.oauth_consumer_key
        if (!req.body || isNil(key)) {
            reject('Must specifiy "oauth_consumer_key" in request.')
        }
        callback(key)
            .then(secret => resolve(Session({ key, secret })))
            .catch(x => {
                reject('Authentication failed')
            })
    })

// createLtiProvider :: Request -> NonceStore -> Session -> Task Error Provider
const createLtiProvider = (req, nonceStore) => session => {
    // Create the LTI Provider in the request object
    req.lti = new Lti.Provider(session.key, session.secret, nonceStore)
    return new Task.of(session)
}

// validateLti :: Request -> Session -> Task Error Provider
const validateLti = req => session =>
    // Validate the incoming lti request
    new Task((reject, resolve) => {
        req.lti.valid_request(req, err => {
            if (err) {
                reject(err)
            } else {
                resolve(session)
            }
        })
    })

// saveLtiSession :: Request -> Session -> Task Error Session
const saveLtiSession = req => session =>
    // Save the validated lti
    new Task((reject, resolve) => {
        session = Session(
            Object.assign(session, {
                params: req.body
            })
        )
        req.lti.session = session
        resolve(session)
    })

// restoreLtiSession :: Request -> NonceStore -> Session -> Task Error Session
const restoreLtiSession = (req, nonceStore) =>
    new Task((reject, resolve) => {
        if (typeof arg == 'object' && !isNil(arg) && req.lti.session) {
            req.lti = new Lti.Provider(
                req.lti.session.key,
                req.lti.session.secret,
                nonceStore
            )
            req.lti.parse_request(req, req.lti.session.params)
            resolve(req.lti.session)
        } else {
            reject('No session to restore')
        }
    })

// The configuration for this middleware.
const Config = cfg =>
    Object.assign(
        {
            // An instance of an nonce store. Expects it to be an object
            // instance of Lti.stores.NonceStore.
            nonceStore: new Lti.Stores.MemoryStore(),

            // Provide a function that lookup the according 'secret' of given
            // 'key'. The function returns an boolean value indicating an
            // error or not.
            // String -> Promise
            authenticate: key => Promise.reject()

            // A route to bypass the lti authentication and access the app
            // behind it directly. This is just ment for debugging.
            // debugRoute: false
            // skipAuthenticationFor: false
        },
        cfg
    )

export default configuration => (req, res, next) => {
    // Validate the given config and fill with default values if something is
    // missing.
    const cfg = Config(configuration)

    // if (req.lti && req.lti.userId) {
    //     handler(req, res, next)
    // } else {
    //     next('Session invalid. Please log-in via LTI')
    // }

    // All steps needed to authenticate lti.
    const doLtiAuthentication = () =>
        startLti(req)
            .chain(authenticateLti(cfg.authenticate))
            .chain(createLtiProvider(req, cfg.nonceStore))
            .chain(validateLti(req))
            .chain(saveLtiSession(req))

    // Try to restore the previous lti session or else execute the lti
    // authentication pipeline to create an lti provider for our app.
    restoreLtiSession(req, cfg.nonceStore)
        .orElse(doLtiAuthentication)
        .fork(err => res.status(500).send(err), success => next())
}
