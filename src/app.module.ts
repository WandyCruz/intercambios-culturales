import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './auth/bcrypt/bcrypt.module';
import { TokenClientModule } from './auth/token-client/token-client.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    BcryptModule,
    TokenClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
