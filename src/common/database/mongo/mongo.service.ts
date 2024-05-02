import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "src/common/config/configuration";

@Injectable()
export class MongoService {
  constructor(private configService?: ConfigService) {}

  uri(): string {
    const database = this.configService.get<DatabaseConfig>('database.mongo');
    return `mongodb://${database.user}:${database.pass}@${database.host}:${database.port}/${database.name}?authSource=${database.auth}`; 
  }   
}