import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/User';


passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Bearer'
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        id: jwtPayload.id
                    }
                });

                if (!user) {
                    return done(new Error(), false);
                }

                return done(undefined, user);
            } catch (err) {
                return done(new Error(), false);
            }
        }
    )
);

module.exports = undefined;
