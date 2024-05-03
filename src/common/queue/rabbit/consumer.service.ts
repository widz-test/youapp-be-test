import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AbstractRabbit } from "./abstract.rabbit";
import { ConfigService } from "@nestjs/config";
import { ConfirmChannel } from "amqplib";

@Injectable()
export class ConsumerService extends AbstractRabbit implements OnModuleInit {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    super(configService);
  }

  public async onModuleInit() {
    try {
      console.log('Queue rabbit consumer started and listening for messages.');
      await this.process();
    } catch (err) {
      console.log('Queue rabbit starting the consumer error:', err);
    }
  }

  async process(): Promise<void> {
    try {
      await this.connect();
      await this.createConfirmChannel();
      // Consumer
      await this.consume("chat");
    } catch(e) {
      console.log(`Queue rabbit consumer error: `, e);
      setTimeout(() => {
        console.log(`Queue rabbit consumer reconnecting!`);
        return this.process();
      }, 1000);
    }
  }

  async consume(queue: string): Promise<void> {
    const __self = this;
    await __self.channelWrapper.assertQueue(queue, {durable: true});
    __self.channelWrapper.consume(
      queue,
      async (message: any) => {
        await this.work(message, function(ok: number) {
          try {
            if (ok) {
              __self.channelWrapper.ack(message);
            } else {
              // __self.channelWrapper.ack(message);
            }
          } catch (e) {
            __self.disconnect();
          }
        });
      }
    )
  }

  async work(message: any, cb: any) {
    try {
      const { content, fields } = message ?? {};
      const { routingKey } = fields ?? {};
      const data = Buffer.isBuffer(content) ? JSON.parse(content.toString()) : null;
      // Consumer Queue
      switch(routingKey) {
        case `chat`:
          const {sender_id, receiver_id, chat} = data ?? {};
          console.log(`Consume queue chat with payload: `, data);
          console.log(`Hi, user ${receiver_id}, you got message from user ${sender_id}: ${chat}`);
          break;
      }
    } catch(e) {
      console.log('Queue rabbit consumer worker error: ', e);
    } finally {
      cb(true);
    }
  }
}