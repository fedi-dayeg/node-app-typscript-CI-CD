import jwt from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import UserRepo from '../repositories/UserRepo';

export function authorize() {
    return [
        jwt({secret: 'bearrer', algorithms: ['HS256']}),

        async (req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
            const user = await UserRepo.getUserById(req.user.sub);

            if (!user) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            req.user = user.get();
        }

    ];

}
