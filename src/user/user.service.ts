import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  getUserByEmail(email: string): Promise<{id: number, email: string, password: string}> {
    return this.userRepository.findOneBy({ email });
  }

  async getCurrentUserByEmailWithoutPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return {
      id: user.id,
      email: user.email
    }
  }

}
