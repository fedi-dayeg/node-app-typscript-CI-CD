"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LessonsController_1 = __importDefault(require("../controllers/LessonsController"));
const lessonValidator_1 = require("../validators/lessonValidator");
class LessonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.lessonsController = new LessonsController_1.default();
        this.lessonValidator = new lessonValidator_1.LessonValidator();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.lessonsController.getAllLeeson);
        this.router.route('/course/:id').get(this.lessonsController.getLessonByCourse);
        this.router.route('/:id').get(this.lessonsController.getLessonById);
        this.router.route('/').post(this.lessonValidator.validateBody(lessonValidator_1.lessonShema), this.lessonsController.createLesson);
        this.router.route('/:id').put(this.lessonValidator.validateBody(lessonValidator_1.lessonShema), this.lessonsController.updateLesson);
        this.router.route('/:id').delete(this.lessonsController.deleteLesson);
    }
}
exports.default = new LessonRoutes().router;
