const { response } = require('../utils/response')

const errorMiddle = (code, msg, data, errors) => {
    return (response('Error', code, msg, data, errors))
}

module.exports = {
    errorMiddle
}