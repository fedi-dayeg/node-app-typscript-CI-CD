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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const bcriptNodejs = __importStar(require("bcrypt"));
const bluebird_1 = require("bluebird");
const User_1 = require("../models/User");
const UserRepo_1 = __importDefault(require("../repositories/UserRepo"));
const bcrypt = (0, bluebird_1.promisifyAll)(bcriptNodejs);
const jwtSignUser = (user) => {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, 'Bearer', {
        expiresIn: ONE_WEEK
    });
};
class AuthController {
    constructor() {
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // const logo = multer({dest: './upload'}).single('photo');
            const { username, password, firstName, lastName, dob, location, mobilePhone, logo, facebookAccount, twitterAccount, googleAccount, email, gender } = user;
            if (user.username === undefined || user.password === undefined) {
                return { success: true, status: 400 };
            }
            try {
                // tslint:disable-next-line:no-shadowed-variable
                const user = yield User_1.User.create({
                    username,
                    password,
                    dob,
                    location,
                    mobilePhone,
                    logo,
                    gender,
                    email,
                    googleAccount,
                    twitterAccount,
                    facebookAccount,
                    firstName,
                    lastName
                });
                const userJson = user.toJSON();
                return {
                    success: true,
                    status: 200,
                    user: userJson,
                    token: jwtSignUser(userJson)
                };
            }
            catch (err) {
                return {
                    success: false,
                    status: 400,
                    message: 'This account is already in use.'
                };
            }
        });
    }
    signin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = user;
            if (username === undefined || password === undefined) {
                return { success: true, status: 400 };
            }
            try {
                // tslint:disable-next-line:no-shadowed-variable
                /*const user: any = await User.findOne({
                    where: {
                        username
                    }
                });*/
                // tslint:disable-next-line:no-shadowed-variable
                const user = yield UserRepo_1.default.findByUser(username);
                if (!user) {
                    return {
                        success: false,
                        status: 401,
                        message: 'user not found'
                    };
                }
                const match = yield bcrypt.compare(password, user.password);
                // console.log(match);
                if (match) {
                    const userJson = user.toJSON();
                    return {
                        success: true,
                        status: 200,
                        user: userJson,
                        token: jwtSignUser(userJson)
                    };
                }
                else {
                    return {
                        success: false,
                        status: 403,
                        message: 'password incorrect'
                    };
                }
            }
            catch (err) {
                return {
                    success: false,
                    status: 403,
                    message: 'An error has occured trying to log in'
                };
            }
        });
    }
}
exports.default = new AuthController();
