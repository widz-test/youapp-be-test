import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RabbitModule } from "src/common/queue/rabbit/rabbit.module";

@Module({
  imports: [RabbitModule],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
