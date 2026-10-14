import { Module } from '@nestjs/common';
import { UsersModel } from './models/users.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserProvider } from './providers/findUser.provider.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  providers: [FindUserProvider],
  exports: [FindUserProvider],
})
export class UsersModule {}
