import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseModel } from "./base.model";

export type ChatDocument = Chat & Document; 

@Schema()
export class Chat extends BaseModel {
    @Prop({required: true})
    sender_id: string;

    @Prop({required: true})
    receiver_id: string;

    @Prop({required: true})
    message: string;

    @Prop({required: false})
    is_read: number;

    @Prop({required: false})
    read_at: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);