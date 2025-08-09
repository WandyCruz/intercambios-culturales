import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

// import { UsersController } from './users.controller';
import { PrimsaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrimsaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
