const statusCode = require("../utlis/statusCode.js");
const constants = require("../constant/constants.js");

module.exports = {
  successWith: (data, httpStatusCode, message, displayMessage, customStatusCode, customData) => {
    if (!data) {
      data = null;
    }
    if (!httpStatusCode) {
      httpStatusCode = statusCode.SUCCESS_CODE;
    }
    if (!message) {
      message = null;
    }
    if (!displayMessage) {
      displayMessage = constants.unknownErrorMessage;
    }
    if (!customStatusCode) {
      customStatusCode = null;
    }
    if (!customData) {
      customData = null;
    }
    return {
      httpStatusCode,
      customStatusCode,
      result: { data, customData },
      message,
      displayMessage,
      status: "OK"
    };
  },
  errorWith: (httpStatusCode, message, displayMessage, customStatusCode, customData) => {
    if (!httpStatusCode) {
      httpStatusCode = statusCode.SERVER_ERROR;
    }
    if (!message) {
      message = null;
    }
    if (!displayMessage) {
      displayMessage = constants.unknownErrorMessage;
    }
    if (!customStatusCode) {
      customStatusCode = null;
    }
    if (!customData) {
      customData = null;
    }
    return {
      httpStatusCode,
      customStatusCode,
      result: { data: null, customData },
      message,
      displayMessage,
      status: "Failure"
    };
  },
  handleErrorResponse: (errorObj, res, error) => {
    if (error) {
        return res.send(error); // This line is causing the error
    }

    let httpStatusCode = statusCode.SERVER_ERROR;
    if (errorObj.errorCode) httpStatusCode = errorObj.errorCode;

    return res.status(httpStatusCode).json(module.exports.errorWith(httpStatusCode, errorObj.message, errorObj.displayMessage, errorObj.customStatusCode));
},

handleSuccessResponse: (data, res, message, displayMessage) => {
    let httpStatusCode = statusCode.SUCCESS_CODE;
    return res.status(httpStatusCode).json(module.exports.successWith(data, httpStatusCode, message, displayMessage));
  }
};