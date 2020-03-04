// The virtual-dom h() function used:
// https://github.com/Matt-Esch/virtual-dom
import h from 'virtual-dom/h'

// Helpers for hyperscript:
// See: https://github.com/ohanhi/hyperscript-helpers
import helpers from 'hyperscript-helpers'

// Render Virtual-Dom to html string
// https://github.com/builtcrew/vdom-to-html
import ToHtml from 'vdom-to-html'

// Also support a first-letter-uppercase spelling to help avoid conflicts
// with other variables or Javascript reserved keywords such as 'var'
const expo = helpers(h)
expo.TAG_NAMES.forEach(n => {
    expo[n] = expo[n.charAt(0).toUpperCase() + n.slice(1)] = expo.createTag(n)
})

// This module is a shortcut to prevent every other to include the both
// imports and do the call which we export
module.exports = expo

// Add render method.
module.exports.render = ToHtml

// Add express template engine support
module.exports.engine = () => (req, res, next) => {
    res.render = vdom => {
        res.write(ToHtml(vdom))
        res.end()
    }
    next()
}
