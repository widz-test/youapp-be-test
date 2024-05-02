import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqp, { Channel, ChannelWrapper } from "amqp-connection-manager";
import { IAmqpConnectionManager } from "amqp-connection-manager/dist/types/AmqpConnectionManager";
import { QueueConfig } from "src/common/config/configuration";

@Injectable()
export abstract class AbstractRabbit {
  protected channelWrapper: ChannelWrapper;
  protected configService: ConfigService;
  protected connection?: IAmqpConnectionManager;

  constructor(@Inject(ConfigService) configService: ConfigService) {
    this.configService = configService;
  }

  async connect(): Promise<void> {
    const queue = this.configService.get<QueueConfig>('queue.rabbit');
    try {
      this.connection = amqp.connect([`amqp://${queue.user}:${queue.pass}@${queue.host}?heartbeat=${queue.hearbeat}`]);
    } catch(e) {
      console.log(`Queue rabbit connection error: `, e);
    }
  }

  async createConfirmChannel(): Promise<void> {
    try {
      this.channelWrapper = this.connection.createChannel({
        confirm: true
      });
    } catch(e) {
      this.disconnect();
      console.log(`Queue rabbit confirm channel error: `, e);
    }
  }

  async disconnect(): Promise<void> {
    if (!this.connection) return
    setTimeout(() => {
      return this.connection.close();
    }, 1000);
  }
}