import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async crearRegistro(create: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: create.email },
    });

    if (user) {
      throw new ConflictException('Usuario existente');
    }

    return this.prisma.user.create({
      data: {
        ...create,
        rol_id: 1,
      },
    });
  }

  async login(email: string) {
    console.log(email);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async verifiUser(idUserToken: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: idUserToken },
    });

    if (!user) {
      throw new BadRequestException('usuario no econtrado');
    }

    return user;
  }
}
