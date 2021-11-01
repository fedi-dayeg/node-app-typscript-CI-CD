import { IUser } from '../typings/auth/IUser';
import AuthController from './auth.service';
import { Request, Response, NextFunction } from 'express';
import  multer from 'multer';
import { User } from '../models/User';
import { apiErrorHandler } from '../handlers/errorHandler';
import UserRepo from '../repositories/UserRepo';
import * as fs from 'fs';
import { uuid } from 'uuidv4';

class UserController {
    constructor() {
    }

    async signin(req: Request, res: Response): Promise<Response> {
        const user: IUser = {
            username: req.body.username,
            password: req.body.password
        };

        const result = await AuthController.signin(user);

        return res.status(result.status).json(result);
    }

    async signup(req: Request, res: Response): Promise<Response> {
        // await User.sync();
        const uploadDir = './uploads';
        const storage = multer.diskStorage({
            destination: (req2: Request, file, cb) => {
                // tslint:disable-next-line:no-null-keyword
                cb(null, uploadDir);
            },
            filename: (req2, file, cb) => {
                // tslint:disable-next-line:no-null-keyword
                cb(null, `${uuid()}-${file.filename}`);
            }
        });

        const upload = multer({
            storage,
            fileFilter: (req2, file, cb) => {
                if (
                    file.mimetype === 'image/png' ||
                    file.mimetype === 'image/jpg' ||
                    file.mimetype === 'image/jpeg'
                ) {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            }
        });
        const user: IUser = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            mobilePhone: req.body.mobilePhone,
            dob: req.body.dob,
            location: req.body.location,
            facebookAccount: req.body.facebookAccount,
            twitterAccount: req.body.twitterAccount,
            logo: req.body.logo
        };

        const result = await AuthController.signup(user);

        return res.status(result.status).json(result);
    }

    async check(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({success: true, status: 200});
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const user = await UserRepo.getUserById(req.params.id);
        return res.json(user);
    }
}

export default new UserController();
