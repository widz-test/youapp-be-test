import { UserRepository } from "src/entity/repository/user.repository";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenConfig } from "src/common/config/configuration";
import { findUserByUsernameOrEmail } from "src/common/utils/user.utils";
import { UnauthorizedException } from "src/exception/unauthorized.exception";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class ChatWsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = context.switchToWs().getClient()
      .handshake.headers.authorization;
    try {
      const token = typeof authorization === 'string'? authorization.split(' ')[1] : null;
      if (!token) {
        throw new UnauthorizedException();
      }
      // Validate token
      const tokenConfig = this.configService.get<TokenConfig>("token");
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: tokenConfig.secret
        }
      );
      // Find user
      const { username } = payload ?? {};
      const user = await findUserByUsernameOrEmail(username ?? "", this.userRepository);
      if (!user) {
        throw new WsException("Unauthorized");
      }
      request['user'] = user;
    } catch {
      throw new WsException("Unauthorized");
    }
    return true;
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}