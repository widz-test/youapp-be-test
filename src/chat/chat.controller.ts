import { Body, Controller, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { User } from "src/common/decorator/user.decorator";
import { ChatService } from "./chat.service";
import { ChatInterceptor } from "./interceptor/chat.inteceptor";
import { ChatDto } from "./dto/chat.dto";
import { ChatListInterceptor } from "./interceptor/chat_list.interceptor";

@Controller('')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseInterceptors(ChatInterceptor)
    @Post('sendMessage')
    async sendMessage(@User() user, @Body() payload: ChatDto) {
        return await this.chatService.sendMessage(user, payload);
    }

    @UseInterceptors(ChatListInterceptor)
    @Post('viewMessages')
    async getProfile(@User() user, @Body() payload: ChatDto) {
        return await this.chatService.getMessages(user, payload);
    }
}
