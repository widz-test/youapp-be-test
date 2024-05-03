import { User } from "src/entity/model/user.model";
import { Injectable } from '@nestjs/common';
import { UserRepository } from "src/entity/repository/user.repository";
import { ProfileDto } from "../dto/profile.dto";
import { Profile } from "src/entity/model/profile.model";
import { ProfileRepository } from "src/entity/repository/profile.repository";
import { Dateparser } from "src/common/utils/dateparser.utils";
import { DisplayableException } from "src/exception/displayable.exception";
import { getZodiac } from "../utils/profile.utils";

@Injectable()
export class ProfileService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository
    ) {}

    async create(user: User, payload: ProfileDto): Promise<Profile> {
        let profile: Profile|null = await this.profileRepository.findById(user.profile_id);
        try {
            const dob = payload.dob ? new Date(payload.dob) : null;
            let zodiac = "";
            let horoscope = "";
            // Find zodiac
            if (dob) {
                const sign = await getZodiac(dob.getDay(), dob.getMonth() + 1, dob.getFullYear());
                zodiac = sign.zodiac;
                horoscope = sign.horoscope;
            }
            // Generate input
            let input = {
                name: payload.name,
                gender: payload.gender,
                dob: dob ? Dateparser.formatDate(dob, 'Y-m-d') : "",
                zodiac: zodiac,
                horoscope: horoscope,
                interest: payload.interest.join(','),
            };
            if (profile) {
                // Update profile
                profile = await this.profileRepository.updateById(profile.id, input);
            } else {
                // Create profile
                profile = await this.profileRepository.create(input);
                await this.userRepository.updateById(user.id, {profile_id: profile.id});
            }
        } catch(e) {
            throw new DisplayableException({}, "Failed create profile");
        }
        return profile ? profile : new Profile();
    }

    async get(user: User): Promise<Profile> {
        const profile = await this.profileRepository.findById(user.profile_id);
        return profile ? profile : new Profile();
    }

    async update(user: User, payload: ProfileDto): Promise<Profile> {
        let profile: Profile|null = await this.profileRepository.findById(user.profile_id);
        if (!profile) {
            throw new DisplayableException({}, "Profile does not exist");
        }
        try {
            const dob = payload.dob ? new Date(payload.dob) : null;
            let zodiac = "";
            let horoscope = "";
            // Find zodiac
            if (dob) {
                const sign = await getZodiac(dob.getDay(), dob.getMonth() + 1, dob.getFullYear());
                zodiac = sign.zodiac;
                horoscope = sign.horoscope;
            }
            // Generate input
            let input = {
                name: payload.name,
                gender: payload.gender,
                dob: dob ? Dateparser.formatDate(dob, 'Y-m-d') : "",
                zodiac: zodiac,
                horoscope: horoscope,
                interest: payload.interest.join(','),
            };
            // Update profile
            profile = await this.profileRepository.updateById(profile.id, input);
        } catch(e) {
            throw new DisplayableException({}, "Failed update profile");
        }
        return profile ? profile : new Profile();
    }
}
