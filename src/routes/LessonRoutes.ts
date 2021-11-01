import { Router } from 'express';
import LessonsController from '../controllers/LessonsController';
import { lessonShema, LessonValidator } from '../validators/lessonValidator';
import { isAuthenticated } from '../middlewares/checkAuth';

class LessonRoutes {
    router = Router();
    lessonsController = new LessonsController();
    lessonValidator = new LessonValidator();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.route('/').get(isAuthenticated, this.lessonsController.getAllLeeson);
        this.router.route('/course/:id').get(this.lessonsController.getLessonByCourse);
        this.router.route('/:id').get(this.lessonsController.getLessonById);
        this.router.route('/').post(this.lessonValidator.validateBody(lessonShema), this.lessonsController.createLesson);
        this.router.route('/:id').put(this.lessonValidator.validateBody(lessonShema), this.lessonsController.updateLesson);
        this.router.route('/:id').delete(this.lessonsController.deleteLesson);
    }
}

export default new LessonRoutes().router;
