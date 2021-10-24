import { Application, urlencoded, json } from 'express';
import morgan from 'morgan';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import helmet from 'helmet';
import * as winston from 'winston';

import Routes from './routes';
import path from 'path';
import rateLimit from './middlewares/rateLimit';
import { unCoughtErrorHandler } from './handlers/errorHandler';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        // tslint:disable-next-line:no-unused-expression
        new Routes(app);

    }

    public config(app: Application): void {
        /* const accessLogStream: WriteStream = fs.createWriteStream(
             path.join(__dirname, './logs/access.log'),
             {flags: 'a'}
         );*/
        // app.use(morgan('combined', {stream: accessLogStream}));
        app.use(urlencoded({extended: true}));
        app.use(json());
        app.use(helmet());
        app.use(rateLimit());
        app.use(unCoughtErrorHandler);
    }
}

process.on('beforeExit', (err) => {
    // winston.error(JSON.stringify(err));
    // tslint:disable-next-line:no-console
    console.log(err);
});
