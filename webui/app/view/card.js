/*
    Card

    A semantic ui component to display a card
*/

// @See: https://github.com/ohanhi/hyperscript-helpers
import { div } from '../server/data/html'

//
// A simple card with some content
//
export const Simple = ({ title = '', description = '' }) =>
    div(
        '.card',
        div('.content', [
            div('.header', title),
            div('.description', description)
        ])
    )

//
// A list of cards
//
export const List = (values = [], element) =>
    div('.ui.cards', values.map(v => element(v)))

export default {
    Simple,
    List
}
