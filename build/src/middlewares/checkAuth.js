"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const isAuthenticated = (req, res, next) => {
    passport_1.default.authenticate('jwt', (err, user) => {
        if (err || !user) {
            res.status(403).send({
                success: false,
                status: 403,
                message: 'you do not have access to this resource'
            });
        }
        else {
            req.body.user = user;
            next();
        }
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
