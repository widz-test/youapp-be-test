import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from "src/entity/repository/user.repository";
import { RegisterDto } from "../dto/register.dto";
import { User } from "src/entity/model/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import { findUserByEmail, findUserByUsername } from "../utils/user.utils";

@Injectable()
export class RegisterService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(payload: RegisterDto): Promise<User> {
        // Validation
        await Promise.all([
            await findUserByEmail(payload.email, this.userRepository),
            await findUserByUsername(payload.username, this.userRepository)
        ])
        const password = await hashPassword(payload.password);
        return await this.userRepository.create({
            username: payload.username.toLowerCase(),
            email: payload.email.toLowerCase(),
            password: password,
        });
    }
}
