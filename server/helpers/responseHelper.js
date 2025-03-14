function createOkObjectSuccess(data) {
    return { status: 200, data };
}

function createResponseError(status, message) {
    return {status: status || 500, data: {error: message || `Okänt fel`} };
}

function createResponseMessage(status, message) {
    return { status: status || 200, data: { message } };
}

module.exports = {
    createOkObjectSuccess,
    createResponseError,
    createResponseMessage
}