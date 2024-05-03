import { Global, Module } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { ProfileRepository } from "./profile.repository";
import { ChatRepository } from "./chat.repository";

@Global()
@Module({
    exports: [
        UserRepository, 
        ProfileRepository,
        ChatRepository
    ],
    providers: [
        UserRepository, 
        ProfileRepository,
        ChatRepository
    ]
})
export class RepositoryModule {}
