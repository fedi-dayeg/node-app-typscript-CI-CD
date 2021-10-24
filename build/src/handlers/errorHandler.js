"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = exports.unCoughtErrorHandler = void 0;
/*const file = new winston.transports.File({
    filename: '../logs/error.log',
    level: 'error',
    handleExceptions: true
});*/
function unCoughtErrorHandler(err, req, res, next) {
    // winston.error(JSON.stringify(err));
    res.send({ error: err });
}
exports.unCoughtErrorHandler = unCoughtErrorHandler;
function apiErrorHandler(err, req, res, message) {
    const error = { Message: message, Stack: err };
    // tslint:disable-next-line:no-console
    console.log(err);
    // winston.error(JSON.stringify(error));
    res.json({ Message: message });
}
exports.apiErrorHandler = apiErrorHandler;
