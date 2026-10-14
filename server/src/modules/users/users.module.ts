import { Module } from '@nestjs/common';
import { UsersModel } from './models/users.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUser } from './providers/findUser.provider.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  providers: [FindUser],
  exports: [FindUser],
})
export class UsersModule {}
