"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoursesController_1 = __importDefault(require("../controllers/CoursesController"));
const courseValidator_1 = require("../validators/courseValidator");
class CourseRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.cpursesController = new CoursesController_1.default();
        this.courseValidator = new courseValidator_1.CourseValidator();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/test').get(this.cpursesController.testService);
        this.router.route('/').get(this.cpursesController.getAllCourses);
        this.router.route('/:id').get(this.cpursesController.getCourseDetail);
        this.router.route('/').post(this.courseValidator.validateBody(courseValidator_1.courseShema), this.cpursesController.createCourse);
    }
}
exports.default = new CourseRoute().router;
