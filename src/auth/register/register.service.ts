import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from "src/entity/repository/user.repository";
import { RegisterDto } from "../dto/register.dto";
import { User } from "src/entity/model/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import { checkUserByEmail, checkUserByUsername } from "../../common/utils/user.utils";

@Injectable()
export class RegisterService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(payload: RegisterDto): Promise<User> {
        // Validation
        await Promise.all([
            await checkUserByEmail(payload.email, this.userRepository),
            await checkUserByUsername(payload.username, this.userRepository)
        ])
        const password = await hashPassword(payload.password);
        return await this.userRepository.create({
            profile_id: "",
            username: payload.username.toLowerCase(),
            email: payload.email.toLowerCase(),
            password: password,
        });
    }
}
