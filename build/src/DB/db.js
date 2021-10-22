"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbUrl = process.env.DATABASE_URL || '';
const nodeEnv = process.env.NODE_ENV || '';
if (!dbUrl) {
    // tslint:disable-next-line:no-console
    console.log('Please create .env file, refer .env.semple');
    process.exit(0);
}
// tslint:disable-next-line:no-console
let optionObj = { benchmark: true, logging: console.log };
if (nodeEnv && nodeEnv === 'production') {
    optionObj = { logging: false };
}
const options = optionObj;
exports.sequelize = new sequelize_1.Sequelize(dbUrl, options);
exports.sequelize.authenticate().then(() => {
    // tslint:disable-next-line:no-console
    console.log('Connection hs been established successfully');
}).catch(err => {
    // tslint:disable-next-line:no-console
    console.log('Unable to connect to the database');
});
