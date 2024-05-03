import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EntityModule } from './entity/entity.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    EntityModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
