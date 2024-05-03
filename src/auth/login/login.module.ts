import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { RepositoryModule } from "src/entity/repository/repository.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('token.secret'),
          signOptions: {
              expiresIn: configService.get<number>('token.expire'),
          },
        }
      },
      inject: [ConfigService],
    }),
    RepositoryModule
  ],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
