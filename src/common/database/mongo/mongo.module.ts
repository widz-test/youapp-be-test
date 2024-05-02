import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoService } from "./mongo.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: (new MongoService(configService)).uri(),
        connectionFactory: connection => {
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
        },
      }),
      inject: [ConfigService],
    })
  ],
})
export class MongoModule {}
