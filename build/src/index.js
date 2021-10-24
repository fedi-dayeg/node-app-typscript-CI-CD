"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const rateLimit_1 = __importDefault(require("./middlewares/rateLimit"));
const errorHandler_1 = require("./handlers/errorHandler");
class Server {
    constructor(app) {
        this.config(app);
        // tslint:disable-next-line:no-unused-expression
        new routes_1.default(app);
    }
    config(app) {
        /* const accessLogStream: WriteStream = fs.createWriteStream(
             path.join(__dirname, './logs/access.log'),
             {flags: 'a'}
         );*/
        // app.use(morgan('combined', {stream: accessLogStream}));
        app.use((0, express_1.urlencoded)({ extended: true }));
        app.use((0, express_1.json)());
        app.use((0, helmet_1.default)());
        app.use((0, rateLimit_1.default)());
        app.use(errorHandler_1.unCoughtErrorHandler);
    }
}
exports.default = Server;
process.on('beforeExit', (err) => {
    // winston.error(JSON.stringify(err));
    // tslint:disable-next-line:no-console
    console.log(err);
});
