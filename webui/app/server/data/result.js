import Daggy from 'daggy'

// Create result type
const Result = Daggy.taggedSum('Result', {
    Ok: ['value'],
    Err: ['code', 'msg']
})

// Create an alias named case for cata, because of usability.
Result.prototype.case = Result.prototype.cata

export default Result
