"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* export function authorize() {
    return [
        jwt({secret: 'bearrer', algorithms: ['HS256']}),

        async (req: Request, res: Response, next: NextFunction) => {

            const user = await UserRepo.getUserById(req.user.sub);

            if (!user) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            req.user = user.get();
        }

    ];

} */
