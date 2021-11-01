"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const checkAuth_1 = require("../middlewares/checkAuth");
const userValidators_1 = require("../validators/userValidators");
const upload_1 = require("../middlewares/upload");
/*const uploadDir = './uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // tslint:disable-next-line:no-null-keyword
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // tslint:disable-next-line:no-null-keyword
        cb(null, `${uuid()}-${file.filename}`);
    }
});*/
/*const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});*/
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});*/
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = UserController_1.default;
        this.userValidator = new userValidators_1.UserValidator();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/login').post(this.userController.signin);
        this.router.route('/register').post(upload_1.uploadFile, this.userValidator.validateBody(userValidators_1.userSchema), this.userController.signup);
        this.router.route('/check').post(checkAuth_1.isAuthenticated, this.userController.check);
        this.router.route('/user/:id').get(checkAuth_1.isAuthenticated, this.userController.getUserById);
    }
}
exports.default = new UserRoutes().router;
