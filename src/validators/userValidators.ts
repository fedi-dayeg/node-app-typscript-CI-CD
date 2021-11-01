import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
    value?: { body?: string };
}

export class UserValidator {
    validateBody(schema: any) {
        return async (req: UserRequest, res: Response, next: NextFunction) => {
            try {
                const val = await schema.validateAsync(req.body);
                req.value = req.value ?? {};
                req.value.body = req.value.body ?? val;
                next();
            } catch (error) {
                res.status(400).json(error);
            }
        };
    }
}

export const userSchema = Joi.object().keys({
    id: Joi.number().integer(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().trim().required(),
    mobilePhone: Joi.number().required(),
    dob: Joi.date(),
    location: Joi.string().trim(),
    facebookAccount: Joi.string().uri(),
    googleAccount: Joi.string().uri(),
    twitterAccount: Joi.string().uri(),
    logo: Joi.string()
});
