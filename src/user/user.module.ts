import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
