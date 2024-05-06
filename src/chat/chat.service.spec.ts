import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { RepositoryModule } from "src/entity/repository/repository.module";
import { PublisherService } from "src/common/queue/rabbit/publisher.service";
import { ConfigModule } from "src/common/config/config.module";
import { CommonModule } from "src/common/common.module";
import { User } from "src/entity/model/user.model";
import { UserRepository } from "src/entity/repository/user.repository";
import { AuthModule } from "src/auth/auth.module";
import { ChatDto } from "./dto/chat.dto";

describe('ChatService', () => {
  let service: ChatService;
  let userRepository: UserRepository;
  let sender: User = new User();
  let receiver: User = new User();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RepositoryModule,
        ConfigModule,
        CommonModule,
        AuthModule
      ],
      providers: [
        ChatService, 
        PublisherService
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    userRepository = module.get<UserRepository>(UserRepository);
    const users = await userRepository.all();
    if (users.length > 1) {
      sender = users[0];
      receiver = users[1];
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should be user send chat', async () => {
    const chatDto: ChatDto = {
      user_id: receiver.id,
      message: "Hi, what's up bro ?"
    }; 
    const chat = await service.sendMessage(sender, chatDto);
    expect(chat.id).not.toBeNull();
    expect(chat.sender_id).toEqual(sender.id);
    expect(chat.receiver_id).toEqual(receiver.id);
    expect(chat.message).toEqual(chatDto.message);
  });
});
