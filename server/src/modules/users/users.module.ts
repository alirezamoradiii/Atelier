import { Module } from '@nestjs/common';
import { UsersModel } from './models/users.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  providers: [],
  exports: [],
})
export class UsersModule {}
