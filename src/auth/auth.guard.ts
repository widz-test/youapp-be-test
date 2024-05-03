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
import { IS_PUBLIC_KEY } from "src/common/decorator/public.decorator";
import { findUserByUsernameOrEmail } from "src/common/utils/user.utils";
import { UnauthorizedException } from "src/exception/unauthorized.exception";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
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
        throw new UnauthorizedException();
      }
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}