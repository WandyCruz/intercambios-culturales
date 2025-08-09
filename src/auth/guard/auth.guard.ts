import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';
interface JwPayload {
  id: number;
  id_rol: number;
}

interface RequesWidtCookies extends Request {
  cookies: {
    [key: string]: string | undefined;
    cookie_token?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configservice: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequesWidtCookies>();
    const rol = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const token = req.cookies?.cookie_token ?? '';
    if (!token) {
      throw new UnauthorizedException('inicia sesion para continuar');
    }

    try {
      const secret = this.configservice.get<string>('clave_secret_token');
      const decoded = this.jwtService.verify<JwPayload>(token, {
        secret: secret,
      });

      const userVerify = await this.userService.verifiUser(decoded.id);

      if (!rol.includes(userVerify.rol_id)) {
        throw new UnauthorizedException('no tienes permisos');
      }

      req['user'] = userVerify;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
