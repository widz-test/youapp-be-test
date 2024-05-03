import { BaseRepository } from "./base.repository";
import { ProfileSchema } from "../model/profile.model";

export class ProfileRepository extends BaseRepository {
    modelName(): string {
        return "profile";
    }

    modelSchema(): any {
        return ProfileSchema;
    }
}