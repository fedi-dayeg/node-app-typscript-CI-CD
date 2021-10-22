"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const uuid_1 = require("uuid");
exports.users = [
    {
        id: (0, uuid_1.v4)(),
        name: 'fedi dayeg',
        email: 'fedi.dayeg@gmail.com',
        password: '123'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'fadwa fadd',
        email: 'fadwa.fadd@gmail.com',
        password: '123'
    }
];
