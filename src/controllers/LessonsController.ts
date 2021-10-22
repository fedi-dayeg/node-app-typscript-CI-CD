import { Request, Response, NextFunction } from 'express';
import LessonsRepo from '../repositories/LessonsRepo';
import { apiErrorHandler } from '../handlers/errorHandler';
import { Lesson } from '../models/Lesson';

export default class LessonsController {

    async getAllLeeson(req: Request, res: Response, next: NextFunction) {
        try {
             // await Lesson.sync();
            const lessons = await LessonsRepo.getAllLessons({order: ['id']});
            res.json(lessons);
        } catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Lessons failed');
        }
    }

    async getLessonByCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const lesson = await LessonsRepo.getLessonByCourse(req.params.id);
            res.json(lesson);
        } catch (error) {
            apiErrorHandler(error, req, res, `Lessons in course ${req.params.id} failed.`);
        }
    }

    async getLessonById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await LessonsRepo.getLessonById(req.params.id);
            if (result) {
                return res.json(result);
            } else {
                res.status(404).send(`Lesson ${req.params.id} not found.`);
            }
        } catch (error) {
            apiErrorHandler(error, req, res, `Lesson ${req.params.id} failed.`);
        }
    }

    async createLesson(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await LessonsRepo.createLesson(req.body);
            res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res, 'Creation of Lesson failed.');
        }
    }

    async updateLesson(req: Request, res: Response, next: NextFunction) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        try {
            const result = await LessonsRepo.updateLesson(id, req.body);
            res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res,  `updation of Lesson ${req.params.id} is failed.`);
        }
    }

    async deleteLesson(req: Request, res: Response, next: NextFunction) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        try {
            const result = await LessonsRepo.deleteLesson(id);
            res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res,  `deletion of Lesson ${req.params.id}  is failed.`);
        }
    }


}
