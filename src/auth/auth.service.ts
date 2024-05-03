import { Inject, Injectable } from '@nestjs/common';
import { RegisterService } from "./register/register.service";
import { RegisterDto } from "./dto/register.dto";
import { User } from "src/entity/model/user.model";

@Injectable()
export class AuthService {
    constructor(private readonly registerService: RegisterService) {}

    async register(payload: RegisterDto): Promise<User> {
        return await this.registerService.register(payload);
    }
}
