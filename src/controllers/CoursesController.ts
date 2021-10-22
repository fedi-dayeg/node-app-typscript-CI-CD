import { Request, Response, NextFunction } from 'express';
import CoursesRepo from '../repositories/CoursesRepo';
import { apiErrorHandler } from '../handlers/errorHandler';

export default class CoursesController {
    async getAllCourses(req: Request, res: Response, next: NextFunction) {
        try {
            // await Course.sync();
            const coursesList = await CoursesRepo.getAllCourses({order: ['seqNo']});
            res.json(coursesList);
        } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Courses failed. ');
        }
    }

    async getCourseDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const courseDetails = await CoursesRepo.getById(req.params.id);
            if (courseDetails) {
                return res.json(courseDetails);
            } else {
                res.status(404).send(`Lesson ${req.params.id} not found.`);
            }
        } catch (error) {
            apiErrorHandler(error, req, res, `Course ${req.params.id} is failed.`);
        }
    }

    async createCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CoursesRepo.createCourse(req.body);
            res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res, 'Creation of Course failed.')
        }
    }
}
