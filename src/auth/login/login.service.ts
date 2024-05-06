import { Injectable } from '@nestjs/common';
import { LoginDto } from "../dto/login.dto";
import { findUserByUsernameOrEmail } from "src/common/utils/user.utils";
import { validatePassword } from "../utils/bcrypt.utils";
import { UnauthorizedException } from "src/exception/unauthorized.exception";
import { UserRepository } from "src/entity/repository/user.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
    constructor(
        private readonly userRepository: UserRepository, 
        private readonly jwtService: JwtService
    ) {}

    async login(payload: LoginDto): Promise<{token: string}> {
        let token = null;
        try {
            // Find user
            const user = await findUserByUsernameOrEmail(payload.username, this.userRepository);
            // Verify password
            if (!validatePassword(payload.password, user.password) || !user.password) {
                throw new UnauthorizedException();
            }
            // Generate token
            token = await this.jwtService.signAsync({
                username: user.username
            });
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException();
        }
        return {
            token: token
        };
    }
}
