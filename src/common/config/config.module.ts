import { Module } from '@nestjs/common';
import { ConfigModule as configModule } from "@nestjs/config";
import configuration from "./configuration";

@Module({
    imports: [configModule.forRoot({
        isGlobal: true,
        load: [configuration]
    })],
})
export class ConfigModule {}
