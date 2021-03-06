import { Router } from 'express';
import UserController from '../controllers/UserController';
import { isAuthenticated } from '../middlewares/checkAuth';
import { userSchema, UserValidator } from '../validators/userValidators';
import multer from 'multer';
import { uuid } from 'uuidv4';
import { uploadFile } from '../middlewares/upload';

/*const uploadDir = './uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // tslint:disable-next-line:no-null-keyword
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // tslint:disable-next-line:no-null-keyword
        cb(null, `${uuid()}-${file.filename}`);
    }
});*/

/*const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});*/
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});*/
class UserRoutes {
    router = Router();
    userController = UserController;
    userValidator = new UserValidator();

    constructor() {
        this.intializeRoutes();
    }



    intializeRoutes() {
        this.router.route('/login').post(this.userController.signin);
        this.router.route('/register').post(uploadFile, this.userValidator.validateBody(userSchema), this.userController.signup);
        this.router.route('/check').post(isAuthenticated, this.userController.check);
        this.router.route('/user/:id').get(isAuthenticated, this.userController.getUserById);

    }
}

export default new UserRoutes().router;
