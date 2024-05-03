import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [LoginModule, RegisterModule]
})
export class AuthModule {}
