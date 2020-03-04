// All html tags are functions you import here
// @See https://github.com/ohanhi/hyperscript-helpers
import { html, body, ul, li, h1 } from './server/data/html'

const Page = ({ message, values }) =>
    html(
        // Body of our app
        body([
            // Show a message
            h1(message),
            // and show how to use javascript to operate on lists, etc..
            ul('Values:', values.map(s => li(s)))
        ])
    )

//  The Lti app
export default (req, res, next) => {
    console.log('Handler')
    return res.render(
        Page({
            title: 'Friend',
            message: 'Welcome brother',
            values: ['Java FX', 'Web Companion', 'Earthship']
        })
    )
}
