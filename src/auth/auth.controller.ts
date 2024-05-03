import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { RegisterInterceptor } from "./interceptor/register.inteceptor";
import { LoginInterceptor } from "./interceptor/login.interceptor";
import { LoginDto } from "./dto/login.dto";

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(RegisterInterceptor)
    @Post('register')
    async register(@Body() payload: RegisterDto) {
        return await this.authService.register(payload);
    }

    @UseInterceptors(LoginInterceptor)
    @Post('login')
    async login(@Body() payload: LoginDto) {
        return await this.authService.login(payload);
    }
}
