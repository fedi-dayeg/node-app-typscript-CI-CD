import { User } from '../models/User';

class UserRepo {
    getUserById(id: any) {
        return User.findByPk(id);
    }
}
export default new UserRepo();
