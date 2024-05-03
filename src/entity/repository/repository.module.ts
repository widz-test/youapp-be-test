import { Global, Module } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { ProfileRepository } from "./profile.repository";

@Global()
@Module({
    exports: [UserRepository, ProfileRepository],
    providers: [UserRepository, ProfileRepository]
})
export class RepositoryModule {}
