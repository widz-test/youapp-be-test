import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { RepositoryModule } from "src/entity/repository/repository.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [RepositoryModule],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
