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
const CoursesRepo_1 = __importDefault(require("../repositories/CoursesRepo"));
const errorHandler_1 = require("../handlers/errorHandler");
const Course_1 = require("../models/Course");
class CoursesController {
    getAllCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Course_1.Course.sync();
                const coursesList = yield CoursesRepo_1.default.getAllCourses({ order: ['seqNo'] });
                res.json(coursesList);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Fetch All Courses failed. ');
            }
        });
    }
    getCourseDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Course_1.Course.sync();
                const courseDetails = yield CoursesRepo_1.default.getById(req.params.id);
                if (courseDetails) {
                    return res.json(courseDetails);
                }
                else {
                    res.status(404).send(`Lesson ${req.params.id} not found.`);
                }
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, `Course ${req.params.id} is failed.`);
            }
        });
    }
    createCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Course_1.Course.sync();
                const result = yield CoursesRepo_1.default.createCourse(req.body);
                res.json(result);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Creation of Course failed.');
            }
        });
    }
}
exports.default = CoursesController;
