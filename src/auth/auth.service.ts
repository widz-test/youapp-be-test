import { Injectable } from '@nestjs/common';
import { RegisterService } from "./register/register.service";
import { RegisterDto } from "./dto/register.dto";
import { User } from "src/entity/model/user.model";
import { LoginService } from "./login/login.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly registerService: RegisterService,
        private readonly loginService: LoginService
    ) {}

    async register(payload: RegisterDto): Promise<User> {
        return await this.registerService.register(payload);
    }

    async login(payload: LoginDto): Promise<any> {
        return await this.loginService.login(payload);
    }
}
