import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { DatabaseConfig } from "src/common/config/configuration";

@Injectable()
export class MongoService implements MongooseOptionsFactory {
  constructor(@Inject(ConfigService) private readonly configService?: ConfigService) {
    this.configService = configService;
  }

  uri(): string {
    const database = this.configService.get<DatabaseConfig>('database.mongo');
    return `mongodb://${database.user}:${database.pass}@${database.host}:${database.port}/${database.name}?authSource=${database.auth}`;
  }

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    return {
      uri: this.uri(),
      connectionFactory: async (connection) => {
        await mongoose.connect(this.uri())
        connection.on("connected", () => {
          console.log("~ DB connected");
        });
        connection.on("disconnected", () => {
          console.log("~ DB disconnected");
        });
        connection.on("error", error => {
          console.log("~ DB connection failed! for error: ", error);
        });
        connection._events.connected();
        return connection;
      }
    }
  }
}