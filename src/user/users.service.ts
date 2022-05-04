import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<any | undefined> {
    try {
      const res = await this.userRepository.findOneBy({ email });
      return {
        id: res.id,
        email: res.email,
        password: res.password,
      };
    } catch {
      return false;
    }
  }
}