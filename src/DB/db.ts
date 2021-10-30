import { Sequelize, Options, Op } from 'sequelize';

const dbUrl: string = 'postgres://postgres:root@localhost/nodeApp' || '';
const nodeEnv: string = process.env.NODE_ENV || '';

if (!dbUrl) {
    // tslint:disable-next-line:no-console
    console.log('Please create .env file, refer .env.semple');
    process.exit(0);
}

// tslint:disable-next-line:no-console
let optionObj: object = {benchmark: true, logging: console.log};

if (nodeEnv && nodeEnv === 'production') {
    optionObj = {logging: false};
}

const options: Options = optionObj;

export const sequelize: Sequelize = new Sequelize(dbUrl, options);

sequelize.authenticate().then(() => {
    // tslint:disable-next-line:no-console
    console.log('Connection hs been established successfully');
}).catch(err => {
    // tslint:disable-next-line:no-console
    console.log('Unable to connect to the database');
});
