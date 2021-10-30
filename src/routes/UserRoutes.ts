import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRoutes {
    router = Router();
    userController = UserController;
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/login', this.userController.signin);
        this.router.post('/register', this.userController.signup);

    }
}

export default new UserRoutes().router;
