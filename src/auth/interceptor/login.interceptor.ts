import { Injectable } from '@nestjs/common';
import { TransformerInterceptor } from "src/common/interceptor/transformer.inteceptor";

@Injectable()
export class LoginInterceptor extends TransformerInterceptor {
    async format(data: {token: string}): Promise<any> {
        return data
    }
}