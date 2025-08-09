import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrimsaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { BcryptModule } from 'src/auth/bcrypt/bcrypt.module';
import { TokenClientModule } from './token-client/token-client.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PrimsaModule,
    UsersModule,
    BcryptModule,
    TokenClientModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
