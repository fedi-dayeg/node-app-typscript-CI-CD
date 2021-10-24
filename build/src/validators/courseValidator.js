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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseShema = exports.CourseValidator = void 0;
const Joi = __importStar(require("joi"));
class CourseValidator {
    validateBody(shema) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const val = yield shema.validateAsync(req.body);
                req.value = (_a = req.value) !== null && _a !== void 0 ? _a : {};
                req.value.body = (_b = req.value.body) !== null && _b !== void 0 ? _b : val;
                next();
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.CourseValidator = CourseValidator;
exports.courseShema = Joi.object().keys({
    description: Joi.string().trim(),
    url: Joi.string().trim().uri().required(),
    longDescription: Joi.string().trim(),
    iconUrl: Joi.string().uri(),
    tags: Joi.string().trim(),
    channelTitle: Joi.string().trim(),
    channelId: Joi.string().trim(),
    seqNo: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});
