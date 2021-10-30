import { IUser } from '../typings/auth/IUser';
import AuthController from './auth.service';
import { Request, Response, NextFunction } from 'express';

import { User } from '../models/User';

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
         await User.sync();
        const user: IUser = {
            username: req.body.username,
            password: req.body.password
        };

        const result = await AuthController.signup(user);

        return res.status(result.status).json(result);
    }

     async check(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ success: true, status: 200 });
    }
}
export default new UserController();
