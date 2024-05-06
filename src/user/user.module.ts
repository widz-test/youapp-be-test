import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
