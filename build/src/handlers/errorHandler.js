"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.apiErrorHandler = exports.unCoughtErrorHandler = void 0;
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
function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}
exports.errorHandler = errorHandler;
