import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    return await bcrypt.hash(data, 12);
  }

  public comparePassword(
    data: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, encryptedPassword);
  }
}
