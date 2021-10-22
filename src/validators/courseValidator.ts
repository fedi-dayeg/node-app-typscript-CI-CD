import { Request, Response, NextFunction} from 'express';
import * as Joi from 'joi';

interface CourseRequest extends Request {
    value?: {body?: string};
}

export class CourseValidator {
    validateBody(shema: any) {
        return async (req: CourseRequest, res: Response, next: NextFunction) => {
            try {
                const val = await shema.validateAsync(req.body);
                req.value = req.value ?? {};
                req.value.body = req.value.body ?? val;
                next();
            } catch (error) {
                res.status(400).json(error);
            }
        };
    }
}

export const courseShema = Joi.object().keys({
    description: Joi.string().trim(),
    url: Joi.string().trim().uri().required(),
    longDescription: Joi.string().trim(),
    iconUrl: Joi.string().uri(),
    tags: Joi.string().trim(),
    channelTitle: Joi.string().trim(),
    channelId: Joi.string().trim(),
    seqNo: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});
