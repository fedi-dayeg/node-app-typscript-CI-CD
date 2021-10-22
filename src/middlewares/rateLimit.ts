import rateLimit from 'express-rate-limit';

const env = process.env.NODE_ENV || 'dev';
const rateLimitRequest = Number(process.env.RATE_LIMIT_TIME) || 15;
const rateLimitTime = Number(process.env.RATE_LIMIT_REQUEST) || 100;

export default () => {
    if (env === 'production') {
        return  rateLimit({
            windowMs: rateLimitTime * 60 * 1000, // 15 min
            max: rateLimitRequest,
            message:  'Rate limt exceeded, please try again later some time.'
        });
    }
    return rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 3000,
        message: 'Rate limt exceeded, please try again later some time.',
    });
};

