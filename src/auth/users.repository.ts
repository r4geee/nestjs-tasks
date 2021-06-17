import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword({
    password,
    username,
  }: AuthCredentialsDto): Promise<string> {
    const user = await this.findOne({ username });

    if (await user?.validatePassword(password)) {
      return user.username;
    }

    return null;
  }

  async createUser({ password, username }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const user = this.create({
      username,
      password: await UsersRepository.hashPassword(password, salt),
      salt,
    });

    await user.save();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      await this.createUser(authCredentialsDto);
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
