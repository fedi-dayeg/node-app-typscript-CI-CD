"use strict";
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
const auth_service_1 = __importDefault(require("./auth.service"));
const multer_1 = __importDefault(require("multer"));
const UserRepo_1 = __importDefault(require("../repositories/UserRepo"));
const uuidv4_1 = require("uuidv4");
class UserController {
    constructor() {
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                username: req.body.username,
                password: req.body.password
            };
            const result = yield auth_service_1.default.signin(user);
            return res.status(result.status).json(result);
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await User.sync();
            const uploadDir = './uploads';
            const storage = multer_1.default.diskStorage({
                destination: (req2, file, cb) => {
                    // tslint:disable-next-line:no-null-keyword
                    cb(null, uploadDir);
                },
                filename: (req2, file, cb) => {
                    // tslint:disable-next-line:no-null-keyword
                    cb(null, `${(0, uuidv4_1.uuid)()}-${file.filename}`);
                }
            });
            const upload = (0, multer_1.default)({
                storage,
                fileFilter: (req2, file, cb) => {
                    if (file.mimetype === 'image/png' ||
                        file.mimetype === 'image/jpg' ||
                        file.mimetype === 'image/jpeg') {
                        cb(null, true);
                    }
                    else {
                        cb(null, false);
                        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                    }
                }
            });
            const user = {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                mobilePhone: req.body.mobilePhone,
                dob: req.body.dob,
                location: req.body.location,
                facebookAccount: req.body.facebookAccount,
                twitterAccount: req.body.twitterAccount,
                logo: req.body.logo
            };
            const result = yield auth_service_1.default.signup(user);
            return res.status(result.status).json(result);
        });
    }
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ success: true, status: 200 });
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.default.getUserById(req.params.id);
            return res.json(user);
        });
    }
}
exports.default = new UserController();
