import { Bind, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Chat } from "src/entity/model/chat.model";
import { ChatWsGuard } from "./chat_ws.guard";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chat.dto";

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway implements NestGateway {
    @WebSocketServer()
    server;

    constructor(private chatService: ChatService) { }

    afterInit(server: any) {
        console.log('Init websocket');
    }

    handleConnection(socket: any) {
        console.log("Connect websocket");
    }

    handleDisconnect(socket: any) {
        console.log('Disconnect websocket');
    }

    @UseGuards(ChatWsGuard)
    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() payload: ChatDto, socket: any): Promise<void> {
        try {
            const { user } = socket ??  {};
            if (user && payload.user_id && payload.message) {
                await this.chatService.sendMessage(user, payload);
            }
        } catch (error) {
            console.log(`Failed send message by socket: `, error);
        }
        this.server.emit('message', payload);
    }
}