import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async getUser(email: string): Promise<any | undefined> {
    try {
      const res = await this.userRepository.findOneBy({ email });
      return {
        userId: res.id,
        email: res.email
      };
    } catch {
      return false
    }
  };

}
