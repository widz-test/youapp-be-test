import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseModel } from "./base.model";

export type UserDocument = User & Document; 

@Schema()
export class User extends BaseModel {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);