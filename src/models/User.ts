import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../DB/db';

import { Promise } from 'bluebird';
import { IUser } from '../typings/auth/IUser';

// tslint:disable-next-line:no-var-requires
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

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

function hashPassword(user: any, options: any) {
    const SALT_FACTOR = 8;

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then((salt: any) => bcrypt.hashAsync(user.password, salt, undefined))
        .then((hash: any) => {
            user.setDataValue('password', hash);
        });
}

export class User extends Model<IUser> {
    id?: number;
    username?: string;
    password?: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        hooks: {
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    }
);

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
