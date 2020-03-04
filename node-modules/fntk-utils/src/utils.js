/*
    utils.js


*/

//
// -- Helper --
//

// RandomBetween :: Int -> Int -> Int
const RandomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

// Random :: List a -> a | Int
const Random = (list = []) =>
    list.length > 0
        ? Let({ index: RandomBetween(0, list.length - 1) }).In(
              ({ index }) => list[index]
          )
        : randomBetween(1, 100)

//
// -- Structures --
//

const Pipe = x => ({
    andThen: fn => Pipe(fn(x)),
    value: () => x
})

const Let = vars => ({
    In: f => f(vars)
})

//
// -- Logging --
//

const curry = f => (a, b) => (b === undefined ? b => f(a, b) : f(a, b))
const doLog = (name, msg, x) => {
    const cat = name.toLowerCase()
    console[cat](`[${name}] ${msg}`, x) // eslint-disable-line
    return x
}
const Log = msg => ({
    debug: curry((txt, x) => doLog('Debug', `[${msg}] [${txt}] Value:`, x)),
    error: curry((txt, x) => doLog('Error', `[${msg}] [${txt}] Value:`, x))
})

// Module Api
module.exports = {
    // Helper
    Random,
    RandomBetween,

    // Structures
    Pipe,
    Let,
    Log
}
