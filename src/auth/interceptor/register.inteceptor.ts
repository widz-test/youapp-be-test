import { Injectable } from '@nestjs/common';
import { User } from "src/entity/model/user.model";
import { TransformerInterceptor } from "src/common/interceptor/transformer.inteceptor";

@Injectable()
export class RegisterInterceptor extends TransformerInterceptor {
    async format(data: User): Promise<any> {
        return {
            id: data.id,
            username: data.username,
            email: data.email
        }
    }
}