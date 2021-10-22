import { Application } from 'express';
import lessonRouter from './LessonRoutes';
import CourseRoute from './CourseRoute';

export default class Routes {
    constructor(app: Application) {
        // for leeson;
        app.use('/api/lessons', lessonRouter);

        // for Courses
        app.use('/api/courses', CourseRoute);
    }
}
