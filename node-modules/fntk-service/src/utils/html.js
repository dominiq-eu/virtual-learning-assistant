// encode(decode) html text into html entity
const decode = str =>
    str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec)
    })

// const encode = str => {
//     let buf = []
//     for (let i = str.length - 1; i >= 0; i--) {
//         buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
//     }
//     return buf.join('')
// }

module.exports = {
    encode,
    decode
}
