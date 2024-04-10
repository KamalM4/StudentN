
const statusCode = require("../utlis/statusCode.js");

module.exports = {
    error: (errorCode, message, displayMessage, customStatusCode, customData) => {
        if (!errorCode) errorCode = statusCode.SERVER_ERROR;
        if (!customStatusCode) {
            return { errorCode, message, displayMessage };
        }
        if (customStatusCode)
            return {
                errorCode,
                message,
                displayMessage,
                customStatusCode,
                customData
            };
    }
};