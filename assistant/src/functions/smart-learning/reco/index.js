const { Response } = require('@fntk/service')

const log = msg => x => {
    console.log(msg, x)
    return x
}

const student = '730a4b24178722046607ba95177230e017d56caf'
// const student = {
//     id: 5,
//     hash: '730a4b24178722046607ba95177230e017d56caf',
//     token: 'bcc4804f12c3fa73e5e4937f905ebfb1'
// }

// const api = {
//     auth: 'srgFzV2xYy!ZwDCgDbvoV',
//     routeId: 'fidg_moodle'
// }

// const getEnrollments = ({ student = { id, token }, api = { auth, routeId } }) =>
//     fetch(
//         `https://vfh143.beuth-hochschule.de/api/lms/users/${student.id}/enrols`,
//         {
//             headers: {
//                 Authorization: 'Bearer ' + api.auth,
//                 'X-Hub': 'https://vfh143.beuth-hochschule.de/api/hub',
//                 'X-TP-Auth': 'Bearer ' + student.token,
//                 'X-Route-Id': api.routeId
//             }
//         }
//     ).then(response => response.json())

// const getCourse = ({
//     course = { contextLabel, entry },
//     student = { id, token },
//     api = { auth, routeId }
// }) =>
//     fetch(
//         `https://vfh143.beuth-hochschule.de/api/lms/context/${contextLabel}/courses/${entry}`,
//         {
//             headers: {
//                 Authorization: 'Bearer ' + api.auth,
//                 'X-Hub': 'https://vfh143.beuth-hochschule.de/api/hub',
//                 'X-TP-Auth': 'Bearer ' + student.token,
//                 'X-Route-Id': api.routeId
//             }
//         }
//     ).then(response => response.json())

const getRecommendation = student =>
    fetch(
        `https://slhw.fokus.fraunhofer.de/apps/slhw/rest/api/students/${student}/learningrecommendations`
    ).then(response => response.json())

const getObjectValues = student => id => {
    console.log('getObjectValues:', student, id)

    const url = `https://slhw.fokus.fraunhofer.de/apps/slhw/rest/api/students/${student}/learningobjects/${id}`
    console.log('getObjectValues:', url)

    return fetch(url).then(response => response.json())
}

module.exports = data => {
    // getEnrollments({ student, api })
    //     .then(log('getEnrollments'))

    //     .then(enrollments => {
    //         console.log('getEnrollments', enrollments)
    //         return enrollments.data.map(course => {
    //             console.log('Course:', course)
    //             return getCourse({ course, student, api })
    //         })
    //     })
    // .then(courses => Promise.all(courses))
    // .then(log('getCourse'))

    return getRecommendation(student)
        .then(res => {
            console.log('[/smart-learning/reco] [Response]', res)
            return res
        })
        .then(data =>
            data[0].learningValues
                .map(idValue => idValue.split('#')[0])
                .map(getObjectValues(student))
        )
        .then(promiseList => Promise.all(promiseList))
        .then(values => {
            console.log('[/smart-learning/reco] [Values]', values)
            const answer = values
                .map(value => value.name)
                .map(name => `- ${name}`)
                .join('\n')
            const payload = `Meine empfehlungen für dich lauten:

${answer}
            `
            console.log('Reco: Payload:', payload)
            return Response.Success(payload)
        })
}
