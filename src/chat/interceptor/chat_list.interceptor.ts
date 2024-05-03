import { Injectable } from '@nestjs/common';
import { TransformerInterceptor } from "src/common/interceptor/transformer.inteceptor";
import { Chat } from "src/entity/model/chat.model";

@Injectable()
export class ChatListInterceptor extends TransformerInterceptor {
	protected async setData(data: any): Promise<any> {
        if(!data) {
            return {};
        }
        return await this.setDataPaginated(data);
    }

    async format(data: Chat): Promise<any> {
        return {
            id: data.id,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message,
            is_read: data.is_read,
            read_at: data.read_at
        };
    }
}