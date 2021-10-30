import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err, user) => {
        if (err || !user) {
            res.status(403).send({
                success: false,
                status: 403,
                message: 'you do not have access to this resource'
            });
        } else {
            req.body.user = user;
            next();
        }
    })(req, res, next);
};
