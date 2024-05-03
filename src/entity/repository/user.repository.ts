import { BaseRepository } from "./base.repository";
import { User, UserSchema } from "../model/user.model";

export class UserRepository extends BaseRepository {
    modelName(): string {
        return "user";
    }

    modelSchema(): any {
        return UserSchema;
    }

    async findByUsernameOrEmail(username: string): Promise<User|null> {
        return this.model().findOne({
            $or: [
                {'username': {'$regex': `^${username}$`, $options:'i'}},
                {'email': {'$regex': `^${username}$`, $options:'i'}}
            ]
        })
    }
}