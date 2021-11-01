"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
// @ts-ignore
const multer_1 = __importDefault(require("multer"));
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb('Please upload only images.', false);
    }
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}-Shehryar-${file.originalname}`;
        req.body.logo = name;
        cb(null, name);
    },
});
exports.uploadFile = (0, multer_1.default)({ storage, fileFilter: imageFilter }).single('logo');
