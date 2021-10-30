import * as jwt from 'jsonwebtoken';
import * as bcriptNodejs from 'bcrypt';
import { promisifyAll } from 'bluebird';
import { IUser } from '../typings/auth/IUser';
import { IResponse } from '../typings/IResponse';
import { User } from '../models/User';

const bcrypt = promisifyAll(bcriptNodejs);

const jwtSignUser = (user: any): string => {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, 'Bearer', {
        expiresIn: ONE_WEEK
    });
};

class AuthController {

    constructor() {
    }

    public async signup(user: IUser): Promise<IResponse> {
        const {username, password} = user;

        if (user.username === undefined || user.password === undefined) {
            return {success: true, status: 400};
        }

        try {
            // tslint:disable-next-line:no-shadowed-variable
            const user = await User.create({username, password});
            const userJson = user.toJSON();
            return {
                success: true,
                status: 200,
                user: userJson,
                token: jwtSignUser(userJson)
            };
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: 'This account is already in use.'
            };
        }
    }

    public async signin(user: IUser) {
        const {username, password} = user;

        if (username === undefined || password === undefined) {
            return {success: true, status: 400};
        }

        try {
            // tslint:disable-next-line:no-shadowed-variable
            const user: any = await User.findOne({
                where: {
                    username
                }
            });

            if (!user) {
                return {
                    success: false,
                    status: 401,
                    message: 'user not found'
                };
            }


            // let isPasswordValid = false;
            /* bcrypt.compare(
                password,
                user.password, (err: any, res: any) => {
                    if (res) {
                        const userJson = user.toJSON();
                        return {
                            success: true,
                            status: 200,
                            user: userJson,
                            token: jwtSignUser(userJson)
                        };
                    } else {
                        return {
                            success: false,
                            status: 403,
                            message: 'password incorrect'
                        };
                    }
                });*/
            const match = await bcrypt.compare(password, user.password);
            // console.log(match);
            if (match) {
                const userJson = user.toJSON();
                return {
                    success: true,
                    status: 200,
                    user: userJson,
                    token: jwtSignUser(userJson)
                };
            } else {
                return {
                    success: false,
                    status: 403,
                    message: 'password incorrect'
                };
            }

        } catch (err) {
            return {
                success: false,
                status: 403,
                message: 'An error has occured trying to log in'
            };
        }
    }
}

export default new AuthController();
