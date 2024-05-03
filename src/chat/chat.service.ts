import { Injectable } from '@nestjs/common';
import { User } from "src/entity/model/user.model";
import { UserRepository } from "src/entity/repository/user.repository";
import { ChatDto } from "./dto/chat.dto";
import { ChatRepository } from "src/entity/repository/chat.repository";
import { Chat } from "src/entity/model/chat.model";
import { findUserByID } from "src/common/utils/user.utils";
import { DisplayableException } from "src/exception/displayable.exception";
import { Dateparser } from "src/common/utils/dateparser.utils";
import { PublisherService } from "src/common/queue/rabbit/publisher.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly chatRepository: ChatRepository,
        private readonly publisherService: PublisherService
    ) {}
    
    async sendMessage(user: User, payload: ChatDto): Promise<Chat> {
        await Promise.all([
            await findUserByID(payload.user_id, this.userRepository)
        ]);
        let chat = null;
        try {
            chat = await this.chatRepository.create({
                sender_id: user.id,
                receiver_id: payload.user_id,
                message: payload.message ?? "",
                is_read: 0,
                read_at: ""
            })
        } catch(e) {
            console.log(e);
        }
        if (!chat) {
            throw new DisplayableException({}, "Failed to send message");
        }
        // Notify receiver user
        this.publisherService.process("", "chat", JSON.stringify({
            sender_id: user.id,
            receiver_id: payload.user_id,
            chat: payload.message ?? ""
        }));
        return chat ? chat : new Chat();
    }

    async getMessages(user: User, payload: ChatDto): Promise<Chat[]> {
        let chats = [];
        try {
            await this.readMessage(user, payload);
            chats = await this.chatRepository.getMessagesBySenderID(user.id, payload.user_id);
        } catch(e) {
            throw new DisplayableException({}, "Failed to get messages");
        }
        return chats;
    }

    protected async readMessage(user: User, payload: ChatDto): Promise<void> {
        await this.chatRepository.update({
            receiver_id: user.id,
            sender_id: payload.user_id,
            is_read: 0
        }, {
            is_read: 1,
            read_at: Dateparser.now()
        });
    }
}
