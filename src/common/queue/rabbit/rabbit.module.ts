import { Module } from '@nestjs/common';
import { PublisherService } from "./publisher.service";
import { ConsumerService } from "./consumer.service";

@Module({
  providers: [PublisherService, ConsumerService],
  exports: [PublisherService]
})
export class RabbitModule {}
