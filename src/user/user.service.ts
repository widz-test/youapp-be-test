import { Injectable } from '@nestjs/common';
import { ProfileService } from "./profile/profile.service";
import { ProfileDto } from "./dto/profile.dto";
import { Profile } from "src/entity/model/profile.model";
import { User } from "src/entity/model/user.model";

@Injectable()
export class UserService {
    constructor(private readonly profileService: ProfileService) {}

    createProfile(user: User, payload: ProfileDto): Promise<Profile> {
        return this.profileService.create(user, payload);
    }

    getProfile(user: User): Promise<Profile> {
        return this.profileService.get(user);
    }

    updateProfile(user:User, payload: ProfileDto): Promise<Profile> {
        return this.profileService.update(user, payload);
    }
}
