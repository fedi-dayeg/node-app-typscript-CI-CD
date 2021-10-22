"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoursesController_1 = __importDefault(require("../controllers/CoursesController"));
class CourseRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.cpursesController = new CoursesController_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.cpursesController.getAllCourses);
        this.router.route('/:id').get(this.cpursesController.getCourseDetail);
    }
}
exports.default = new CourseRoute().router;
