const { response } = require('../utils/response')

const success = (code, msg, data, errors) => {
    return (response('Success', code, msg,  data, errors))
}

module.exports = {
    success
}