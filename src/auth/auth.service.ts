import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { TokenClientService } from './token-client/token-client.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcrypt: BcryptService,
    private readonly jwtClient: TokenClientService,
  ) {}
  async create(createUserData: CreateUserDto) {
    const passwordHash = await this.bcrypt.hashpassword(
      String(createUserData.password),
    );

    return await this.userService.crearRegistro({
      ...createUserData,
      password: passwordHash,
    });
  }

  async login(loginUsrDto: LoginUserDto) {
    const user = await this.userService.login(loginUsrDto.email);
    if (!user) {
      throw new BadRequestException('usuario no existente');
    }

    const comparePassword = await this.bcrypt.compararPassword(
      loginUsrDto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException('password or email swrong');
    }

    const token = await this.jwtClient.GenerateToken({
      id: user.id,
      id_rol: user.rol_id,
    });

    return token;
  }
}
