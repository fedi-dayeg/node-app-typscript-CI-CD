import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

/*const file = new winston.transports.File({
    filename: '../logs/error.log',
    level: 'error',
    handleExceptions: true
});*/

export function unCoughtErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // winston.error(JSON.stringify(err));
    res.send({error: err});
}

export function apiErrorHandler(
    err: any,
    req: Request,
    res: Response,
    message: string
) {
    const error: object = { Message: message, Stack: err };
    // tslint:disable-next-line:no-console
    console.log(err);
    // winston.error(JSON.stringify(error));
    res.json({Message: message});
}
