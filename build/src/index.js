"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const fs = __importStar(require("fs"));
const helmet_1 = __importDefault(require("helmet"));
const winston = __importStar(require("winston"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const rateLimit_1 = __importDefault(require("./middlewares/rateLimit"));
const errorHandler_1 = require("./handlers/errorHandler");
class Server {
    constructor(app) {
        this.config(app);
        // tslint:disable-next-line:no-unused-expression
        new routes_1.default(app);
    }
    config(app) {
        const accessLogStream = fs.createWriteStream(path_1.default.join(__dirname, './logs/access.log'), { flags: 'a' });
        app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
        app.use((0, express_1.urlencoded)({ extended: true }));
        app.use((0, express_1.json)());
        app.use((0, helmet_1.default)());
        app.use((0, rateLimit_1.default)());
        app.use(errorHandler_1.unCoughtErrorHandler);
    }
}
exports.default = Server;
process.on('beforeExit', (err) => {
    winston.error(JSON.stringify(err));
    // tslint:disable-next-line:no-console
    console.log(err);
});
