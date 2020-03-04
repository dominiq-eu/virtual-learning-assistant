/*
    Input

    A semantic ui component to display an input field
*/

// @See: https://github.com/ohanhi/hyperscript-helpers
import { div, input } from '../server/data/html'

//
// A simple text input field
//
const Text = ({ placeholder = '', fluid = false, transparent = false }) =>
    div(
        '.ui'
            .concat(fluid ? '.fluid' : '')
            .concat(transparent ? '.transparent' : '')
            .concat('.input'),
        input({ type: 'text', placeholder })
    )

//
// A text input field with an attached button
//
const Action = (
    button,
    { placeholder = '', fluid = false, transparent = false, focus = false }
) =>
    div(
        '.ui.action'
            .concat(fluid ? '.fluid' : '')
            .concat(focus ? '.focus' : '')
            .concat(transparent ? '.transparent' : '')
            .concat('.input'),
        [input({ type: 'text', placeholder }), button]
    )

export default {
    Text,
    Action
}
