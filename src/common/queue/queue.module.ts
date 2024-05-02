import { Module } from '@nestjs/common';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [RabbitModule]
})
export class QueueModule {}
