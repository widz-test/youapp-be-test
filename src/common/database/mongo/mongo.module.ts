import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoService } from "./mongo.service";
import { ConfigService } from "@nestjs/config";
import { UserSchema } from "src/entity/model/user.model";
import mongoose from "mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoService,
      inject: [ConfigService],
    })
  ],
  providers: [MongoService],
  exports: [MongoService]
})
export class MongoModule {}
