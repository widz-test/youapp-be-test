import { BaseRepository } from "./base.repository";
import { UserSchema } from "../model/user.model";

export class UserRepository extends BaseRepository {
    modelName(): string {
        return "user";
    }

    modelSchema(): any {
        return UserSchema;
    }
}