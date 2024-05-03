import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export abstract class BaseModel {
    id: string;

    @Prop({required: false})
    created_at: string;

    @Prop({required: false})
    updated_at: string;
}