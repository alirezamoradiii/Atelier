import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersModel } from '../models/users.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersModel: Repository<UsersModel>,
  ) {}
  public async byEmail(email: string): Promise<UsersModel | null> {
    try {
      return await this.usersModel.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
