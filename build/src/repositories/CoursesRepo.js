"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = require("../models/Course");
const Lesson_1 = require("../models/Lesson");
class CoursesRepo {
    getAllCourses(options) {
        return Course_1.Course.findAll(options);
    }
    getById(courseId) {
        return Course_1.Course.findByPk(courseId, {
            include: [
                {
                    model: Lesson_1.Lesson,
                    as: 'lessons'
                },
            ],
        });
    }
    createCourse(props) {
        return Course_1.Course.create(props);
    }
}
exports.default = new CoursesRepo();
