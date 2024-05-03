import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { RegisterInterceptor } from "./interceptor/register.inteceptor";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(RegisterInterceptor)
    @Post('register')
    async register(@Body() payload: RegisterDto) {
        return await this.authService.register(payload);
    }
}
