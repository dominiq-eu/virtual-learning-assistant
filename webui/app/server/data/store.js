import Lti from 'ims-lti'
import Task from 'data.task'

// We need to define a session store, because the default one leaks memory
// and is just for the purpose of debugging and development. Probably
// mongodb or sqlite (if available) would be appropiate.
//
// See:
// https://github.com/expressjs/session#compatible-session-stores

export default {
    // Store
    create: () => {
        const Store = new Lti.Stores.MemoryStore()
    },

    getSecret: consumerKey =>
        new Task((reject, resolve) => {
            if (consumerKey == 'LTIkey') {
                resolve('LTIsecret')
            } else {
                reject('<h1>Authentication Error</h1>')
            }
        })
}
