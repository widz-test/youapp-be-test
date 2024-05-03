import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RepositoryModule } from "src/entity/repository/repository.module";

@Module({
  imports: [RepositoryModule],
  providers: [RegisterService],
  exports: [RegisterService]
})
export class RegisterModule {}
