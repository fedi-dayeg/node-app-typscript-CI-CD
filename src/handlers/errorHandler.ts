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

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const  statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({message: err});
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({message: 'Unauthorized'});
        default:
            return res.status(500).json({message: err.message});
    }
}
