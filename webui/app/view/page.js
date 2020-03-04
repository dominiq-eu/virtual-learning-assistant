/*
    Page

    Component to define the basic skeleton of an page using a css framework.
*/

// @See: https://github.com/ohanhi/hyperscript-helpers
import { html, head, meta, title, link, script, div } from '../server/data/html'

const Container = element => div('.ui.container', element)
const TextContainer = (element, params = {}, classes = []) =>
    div(
        '.ui '.concat(classes.join(' ')).concat(' .text.container'),
        params,
        element
    )
const FluidContainer = element => div('.ui.fluid.container', element)
const BottomFluidContainer = element =>
    div('.ui.fluid.container.stickBottom', element)

const Column = element => div('.column', element)

const Segment = (element, params = []) =>
    div('.ui'.concat(params.map(p => `.${p}`).concat('.segment')), element)

const Html = (name, body) =>
    html([
        head([
            meta({
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }),
            title(name),
            link({
                rel: 'stylesheet',
                type: 'text/css',
                href: 'semantic.min.css'
            }),
            link({
                rel: 'stylesheet',
                type: 'text/css',
                href: 'styles.css'
            }),
            script({
                src: 'jquery-3.1.1.min.js',
                integrity:
                    'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
                crossorigin: 'anonymous'
            }),
            script({ src: 'semantic.min.js' }),
            script({ src: 'socket.io/socket.io.js' })
        ]),
        body
    ])

export default {
    Html,
    Container,
    TextContainer,
    FluidContainer,
    BottomFluidContainer,
    Column,
    Segment
}
