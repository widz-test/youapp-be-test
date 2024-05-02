import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { AbstractRabbit } from "./abstract.rabbit";

@Injectable()
export class PublisherService extends AbstractRabbit {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    super(configService);
  }

  async process(exchange: string, route: string, payload: any) {
    try {
      await this.connect();
      await this.createConfirmChannel();
      await this.publish(exchange, route, payload);
      this.disconnect();
    } catch(e) {
      console.log(`Failed publish message with error: `, e);
    }
  }

  protected async publish(exchange: string, route: string, payload: any): Promise<void> {
    try {
      this.channelWrapper.publish(exchange, route, Buffer.from(payload), {
        persistent: true
      });
    } catch (e) {
      this.channelWrapper.close();
      console.log(`Queue rabbit failed publish message with error: `, e);
    }
  }
}