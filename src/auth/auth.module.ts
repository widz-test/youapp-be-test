import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService
  ],
  exports: [AuthService],
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
      global: true,
      inject: [ConfigService],
    }),
    LoginModule, 
    RegisterModule
  ]
})
export class AuthModule {}
