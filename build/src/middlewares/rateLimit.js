"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env = process.env.NODE_ENV || 'dev';
const rateLimitRequest = Number(process.env.RATE_LIMIT_TIME) || 15;
const rateLimitTime = Number(process.env.RATE_LIMIT_REQUEST) || 100;
exports.default = () => {
    if (env === 'production') {
        return (0, express_rate_limit_1.default)({
            windowMs: rateLimitTime * 60 * 1000,
            max: rateLimitRequest,
            message: 'Rate limt exceeded, please try again later some time.'
        });
    }
    return (0, express_rate_limit_1.default)({
        windowMs: 5 * 60 * 1000,
        max: 3000,
        message: 'Rate limt exceeded, please try again later some time.',
    });
};
