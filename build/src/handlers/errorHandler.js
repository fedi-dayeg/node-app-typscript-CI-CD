"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = exports.unCoughtErrorHandler = void 0;
const winston_1 = __importDefault(require("winston"));
const file = new winston_1.default.transports.File({
    filename: '../logs/error.log',
    level: 'error',
    handleExceptions: true
});
function unCoughtErrorHandler(err, req, res, next) {
    winston_1.default.error(JSON.stringify(err));
    res.send({ error: err });
}
exports.unCoughtErrorHandler = unCoughtErrorHandler;
function apiErrorHandler(err, req, res, message) {
    const error = { Message: message, Stack: err };
    // tslint:disable-next-line:no-console
    console.log(err);
    winston_1.default.error(JSON.stringify(error));
    res.json({ Message: message });
}
exports.apiErrorHandler = apiErrorHandler;
