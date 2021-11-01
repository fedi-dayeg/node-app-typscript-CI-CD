import { User } from '../models/User';

class UserRepo {
    getUserById(id: any) {
        return User.findByPk(id);
    }
    findByUser(username: string) {
        return User.findOne({ where: {username}});
    }
}
export default new UserRepo();
