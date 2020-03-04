import 'isomorphic-fetch'

import Showdown from 'showdown'
import Route from './server/data/route'
import { body, form, h1, div, button, script } from './server/data/html'

// Components
import Page from './view/page'
import Input from './view/input'

// Debugging mode?
// const Debug = process.env.NODE_ENV === 'debug'
const Debug = true

//
// Initial App State
//

const State = {
    title: 'Learning Assistant',
    message: 'Frag mich was.. ',
    text: []
}

//
// -- Helper
//

const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const random = (list = []) => {
    if (list.length > 0) {
        const index = randomBetween(0, list.length - 1)
        return list[index]
    } else {
        return randomBetween(0, 100)
    }
}

//
// Components
//

const Menu = (element, { position = 'top', fixed = false }) =>
    div(
        '.ui'
            .concat(position ? `.${position}` : '')
            .concat(fixed ? '.fixed' : '')
            .concat('.menu'),
        element
    )

const BottomMenu = (element, params = {}) =>
    Menu(element, Object.assign(params, { position: 'bottom' }))

const Button = text => button('.ui.button', text)

const Formular = element => form('.ui.form', element)
/* <div class="ui feed">
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/laura.jpg">
    </div>
    <div class="content">
      <div class="summary">
         <a>Assistant</a>
      </div>
      <div class="extra text">
        Have you seen what's going on in Israel? Can you believe it.
      </div>
    </div>
  </div>
</div>
*/

const Feed = () => div('.ui.large.feed', { id: 'messages' })
const Message = (name, icon, text) =>
    div('.event', [
        div('.label', span(`.${icon}.icon`)),
        div('.content', div('.summary', text))
    ])

// App content
const Body = ({ message = 'Unknown', text = [] }) =>
    body([
        // Chat text
        Page.TextContainer([
            h1(
                '#headline',
                {
                    style: {
                        'padding-top': '7%',
                        'padding-bottom': '15%'
                    }
                },
                message
            ),
            Feed()
        ]),

        // Chat Input
        Page.TextContainer(
            Formular([
                Input.Action(Button('Send'), {
                    placeholder: 'Kannst du mir helfen?',
                    fluid: true,
                    transparent: false
                })
            ]),
            {
                id: 'questionBox',
                style: {
                    'margin-top': '64px'
                }
            },
            ['fixed', 'bottom', 'sticky']
            // ['.stickBottom']
        ),
        script(
            function main() {
                const msgEl = $('#messages')

                function message(name, text) {
                    return (
                        '<small><b>' +
                        name +
                        '</b></small><br/><span>' +
                        text +
                        '</span>'
                    )
                }

                function request(sentence) {
                    console.log(sentence)
                    sentence = sentence || 'Kannst du mir helfen?'
                    const compEl = $(
                        '<div class="ui right aligned fluid container">'
                    )
                    msgEl.append(compEl.append($(message('Du', sentence))))

                    // msgEl.append($(message('Du', 'pencil', sentence)))

                    $.post(location.origin + '/chat', { sentence }, data => {
                        console.log('Response:', data)

                        const compEl = $(
                            '<div class="ui left aligned fluid container">'
                        )

                        msgEl.append(
                            compEl.append($(message('Assistent', data)))
                        )

                        // if (String(data).indexOf('<') >= 0) {
                        //     msgEl.append($(data))
                        // } else {
                        //     msgEl.append(compEl.text(data))
                        // }
                        window.scrollTo(0, document.body.scrollHeight)
                    })
                    window.scrollTo(0, document.body.scrollHeight)
                }

                $('input').focus()

                request('/start')

                $('form').submit(function() {
                    const sentence = $('input').val()
                    request(sentence)
                    $('input').val('')
                    return false
                })
            }.toString() + ';\n$(document).ready(main);'
        )
    ])

const errorReply = reply => e =>
    reply(
        random([
            'Entschuldige.. Das verstehe ich noch nicht.'
            // 'Bitte, was???',
            // 'Das kann ich leider noch nicht.',
            // 'Vielleicht nächstes mal',
            // 'xO',
            // 'Da kann ich auch nichts machen'
            // 'Es gibt nichts zu sehen, bitte weiter gehen.',
            // 'Haha.. Tut mir leid: InternalError: 0xBAADF00D xD'
        ])
    )

const socketHandler = (txt, reply) => {
    console.log('Msg: ', txt)
    const txtCompat = encodeURI(txt)

    // Ask the virtual assistant
    return fetch(`http://gateway:8000/smart-learning?sentence=${txtCompat}`)
        .then(res => res.json())
        .then(res => {
            // Send the answer of the virtual assistant back to the ui
            console.log('VA:', res)
            return reply(JSON.stringify(res))
        })
        .catch(errorReply(reply))
}

const botProxy = (req, res, next) => {
    console.log('Req: ', req.body)
    const data = Object.keys(req.body)
        .map(k => '' + k + '=' + req.body[k])
        .join('&')
    const urlData = encodeURI(data)
    const url = `http://gateway:8000/smart-learning?${urlData}`
    console.log(url)

    // Ask the virtual assistant
    fetch(url)
        .then(data => {
            console.log('Data:', data)
            return data.json()
        })
        .then(data => {
            // Send the answer of the virtual assistant back to the ui
            console.log('VA:', data)
            if (data.ok) {
                console.log('Value: ', data.value)
                const converter = new Showdown.Converter()
                const html = converter.makeHtml(data.value)
                console.log('Html: ', html)
                res.write(html)
                // res.write(JSON.stringify(data))
                res.end()
            } else if (data.error) {
                console.log('WRITE: ', data.error)
                res.write(String(data.error))
                // res.write(JSON.stringify(data))
                res.end()
            } else {
                return Promise.reject('Kenn ich nicht')
            }
        })
        .catch(
            errorReply(e => {
                res.write(e)
                res.end()
            })
        )
}

// The Lti Web-App
const app = state => (req, res, next) =>
    res.render(Page.Html(state.title, Body(state)))

// LTI configuration
export default {
    // Function to resolve the credentials and authenticate the
    // LTI request.
    authenticate: key => Promise.resolve('secret'),

    // The routes provided by this web app. LTI routes needs to
    // be authenticated through the authenticate function.
    routes: [
        // Default Route
        Route.lti('/', app(State)),
        // Route.socket('/chat', socketHandler)
        Route.post('/chat', botProxy)
    ].concat(
        // In debug mode, add debug route.
        Debug ? [Route.get('/test', app(State))] : []
    )
}
