import { httpGet } from './server/utils'

// getRecoUrl :: StudentId -> Url
const getRecoUrl = studentId =>
    `https://slhw.fokus.fraunhofer.de/apps/slhw/rest/api/students/${studentId}/learningrecommendations/`

// The lti app
export default {
    configure: app => {
        // Pug template support
        app.set('views', './app/view')
        app.set('view engine', 'pug')
        app.use((req, res, next) => {
            // remove the port from the url and change https to http
            // to avoid problems with the oauth signature
            // port redirect causes host address for client and host not to be identical
            // e.g. req.headers.host = 'localhost'
        })
    },

    handler: (req, res, next) => {
        const studentId = '2afe825ed1b9c5152ccc0ec9173ec339e79c1d5b'
        const url = getRecoUrl(studentId)

        httpGet(url).fork(
            // error => res.status(500).send('No reco engine..!?'),
            error => next('No reco engine..!?'),
            data => {
                res.render('index', {
                    title: 'LTI App',
                    message: 'Mr. B',
                    values: JSON.parse(data)[0].modules
                })
            }
        )
    }
}
