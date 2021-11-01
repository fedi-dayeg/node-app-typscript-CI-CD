"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserRepo {
    getUserById(id) {
        return User_1.User.findByPk(id);
    }
    findByUser(username) {
        return User_1.User.findOne({ where: { username } });
    }
}
exports.default = new UserRepo();
