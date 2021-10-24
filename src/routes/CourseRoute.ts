import { Router } from 'express';
import CoursesController from '../controllers/CoursesController';
import { courseShema, CourseValidator } from '../validators/courseValidator';

class CourseRoute {
    router = Router();
    cpursesController = new CoursesController();
    courseValidator = new CourseValidator();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.route('/').get(this.cpursesController.getAllCourses);
        this.router.route('/:id').get(this.cpursesController.getCourseDetail);
        this.router.route('/').post(this.courseValidator.validateBody(courseShema), this.cpursesController.createCourse);
    }
}


export default new CourseRoute().router;
