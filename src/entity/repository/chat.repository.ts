import { BaseRepository } from "./base.repository";
import { Chat, ChatSchema } from "../model/chat.model";

export class ChatRepository extends BaseRepository {
    modelName(): string {
        return "chat";
    }

    modelSchema(): any {
        return ChatSchema;
    }

    async getMessagesBySenderID(userID: string, senderID: string): Promise<Chat[]> {
        return await this.model()
            .find({
                $or: [
                    {
                        $and: [
                            {sender_id: senderID},
                            {receiver_id: userID}
                        ]
                    },
                    {
                        $and: [
                            {sender_id: userID},
                            {receiver_id: senderID}
                        ]
                    }
                ]
            })
            .sort({
                created_at: "desc"
            });
    }
}