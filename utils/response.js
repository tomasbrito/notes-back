const response = (status, code, message, data, errors) => {
    return {status, code, message, data, errors}
}

module.exports = {
    response
}