// Hjälpfunktioner för att skapa API-svar (framgång, fel och meddelanden)

//Skapar ett lyckat API-svar med status 200 och inkluderar data.
function createOkObjectSuccess(data) {
    return { status: 200, data };
}

//Skapar ett felmeddelande för API-svar.
function createResponseError(status, message) {
    return {status: status || 500, data: {error: message || `Okänt fel`} };
}

//Skapar ett meddelande för API-svar.
function createResponseMessage(status, message) {
    return { status: status || 200, data: { message } };
}

// Exporterar funktionerna så att de kan användas i andra delar av applikationen
module.exports = {
    createOkObjectSuccess,
    createResponseError,
    createResponseMessage
}