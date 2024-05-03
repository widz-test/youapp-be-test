import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as UserModel } from "src/entity/model/user.model";

export const User = createParamDecorator((data, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});