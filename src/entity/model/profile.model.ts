import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseModel } from "./base.model";

export type ProfileDocument = Profile & Document; 

@Schema()
export class Profile extends BaseModel {
    @Prop({required: false})
    name: string;

    @Prop({required: false})
    gender: string;

    @Prop({required: false})
    birthday: string;

    @Prop({required: false})
    dob: string;

    @Prop({required: false})
    horoscope: string;

    @Prop({required: false})
    zodiac: string;

    @Prop({required: false})
    interest: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);