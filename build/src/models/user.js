"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../DB/db");
const bluebird_1 = require("bluebird");
// tslint:disable-next-line:no-var-requires
const bcrypt = bluebird_1.Promise.promisifyAll(require('bcrypt-nodejs'));
/*export class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public gender!: string;
    public mobilePhone!: number;
    public dob!: string;
    public location!: string;
    public username!: string;
    public hash!: string;
    public facebookAccount!: string;
    public googleAccount!: string;
    public twitterAccount!: string;
    public logo!: string;
}*/
function hashPassword(user, options) {
    const SALT_FACTOR = 8;
    if (!user.changed('password')) {
        return;
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then((salt) => bcrypt.hashAsync(user.password, salt, undefined))
        .then((hash) => {
        user.setDataValue('password', hash);
    });
}
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    gender: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    mobilePhone: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    dob: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    location: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    facebookAccount: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    googleAccount: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    twitterAccount: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    logo: { type: sequelize_1.DataTypes.STRING, allowNull: true }
}, {
    sequelize: db_1.sequelize,
    modelName: 'User',
    tableName: 'user',
    hooks: {
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
    }
});
/*User.init({
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    /!*firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: true},
    mobilePhone: {type: DataTypes.INTEGER, allowNull: true},
    dob: {type: DataTypes.DATE, allowNull: true},
    location: {type: DataTypes.STRING, allowNull: true},
    username: {type: DataTypes.STRING, allowNull: false},
    hash: {type: DataTypes.STRING, allowNull: false},
    facebookAccount: {type: DataTypes.STRING, allowNull: true},
    googleAccount: {type: DataTypes.STRING, allowNull: true},
    twitterAccount: {type: DataTypes.STRING, allowNull: true},
    logo: {type: DataTypes.STRING, allowNull: true}*!/
}, {sequelize, tableName: 'Users'});*/
