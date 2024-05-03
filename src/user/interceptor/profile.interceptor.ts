import { Injectable } from '@nestjs/common';
import { TransformerInterceptor } from "src/common/interceptor/transformer.inteceptor";
import { Profile } from "src/entity/model/profile.model";

@Injectable()
export class ProfileInterceptor extends TransformerInterceptor {
    async format(data: Profile): Promise<any> {
        return {
            name: data.name,
            gender: data.gender,
            dob: data.dob,
            horoscope: data.horoscope,
            zodiac: data.zodiac,
            interest: typeof data.interest === "string" ? data.interest.split(",") : []
        }
    }
}