import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() LoginUserDto: LoginUserDto,
    // @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(LoginUserDto);

    // res.cookie('cookie_token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   maxAge: 1000 * 90 * 90 * 54, // 1 día
    // });
    return { token: token, mendaje: 'login exitoso' };
  }
}
