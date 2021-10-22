"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LessonRoutes_1 = __importDefault(require("./LessonRoutes"));
const CourseRoute_1 = __importDefault(require("./CourseRoute"));
class Routes {
    constructor(app) {
        // for leeson;
        app.use('/api/lessons', LessonRoutes_1.default);
        // for Courses
        app.use('/api/courses', CourseRoute_1.default);
    }
}
exports.default = Routes;
