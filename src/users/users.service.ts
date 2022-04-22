import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async getUser(email: string): Promise<any | undefined> {
    try {
      const res = await this.userRepository.findOneBy({ email });
      return {
        userId: res.id,
        email: res.email,
        password: res.password
      };
    } catch {
      return false;
    }
  };

}
