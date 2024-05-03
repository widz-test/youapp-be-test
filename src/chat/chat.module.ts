import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RabbitModule } from "src/common/queue/rabbit/rabbit.module";
import { ChatGateway } from "./chat.gateway";
import { ChatWsGuard } from "./chat_ws.guard";

@Module({
  imports: [RabbitModule],
  providers: [ChatService, ChatGateway, ChatWsGuard],
  controllers: [ChatController]
})
export class ChatModule {}
