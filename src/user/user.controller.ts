import { Body, Controller, Get, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from "./user.service";
import { ProfileInterceptor } from "./interceptor/profile.interceptor";
import { ProfileDto } from "./dto/profile.dto";
import { User } from "src/common/decorator/user.decorator";

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ProfileInterceptor)
    @Post('createProfile')
    async createProfile(@User() user, @Body() payload: ProfileDto) {
        return await this.userService.createProfile(user, payload);
    }

    @UseInterceptors(ProfileInterceptor)
    @Get('getProfile')
    async getProfile(@User() user) {
        return await this.userService.getProfile(user);
    }

    @UseInterceptors(ProfileInterceptor)
    @Put('updateProfile')
    async updateProfile(@User() user, @Body() payload: ProfileDto) {
        return await this.userService.updateProfile(user, payload);
    }
}
