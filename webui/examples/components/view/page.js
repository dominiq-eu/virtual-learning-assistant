/*
    Page

    Component to define the basic skeleton of an page using a css framework.
*/

// @See: https://github.com/ohanhi/hyperscript-helpers
import { html, head, title, link, script } from '../server/data/html'

export default (name, body) =>
    html([
        head([
            title(name),
            link({
                rel: 'stylesheet',
                type: 'text/css',
                href: '/semantic.min.css'
            }),
            script({
                src: 'https://code.jquery.com/jquery-3.1.1.min.js',
                integrity:
                    'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
                crossorigin: 'anonymous'
            }),
            script({ src: '/semantic.min.js' })
        ]),
        body
    ])
