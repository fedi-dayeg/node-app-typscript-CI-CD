import { Application } from 'express';
import lessonRouter from './LessonRoutes';
import CourseRoute from './CourseRoute';
import UserRoutes from './UserRoutes';

export default class Routes {
    constructor(app: Application) {
        // for leeson;
        app.use('/api/lessons', lessonRouter);

        // for Courses
        app.use('/api/courses', CourseRoute);

        // for user
        app.use('/api/', UserRoutes);
    }
}
