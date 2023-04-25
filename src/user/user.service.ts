import { UserResponse } from './../types/user';
import { UpdateUserDto } from './dto/updateUserDto';
import { createUserDto } from './dto/createUserDto';
import { UserEntity } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserSignResponse } from 'src/types/user';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: createUserDto): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      throw new HttpException(
        {
          error: 'User with this email are alrady exist',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = {
      id: randomUUID(),
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      name: body.name ? body.name : 'Anon',
      avatarUrl:
        'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg',
    };

    const createdUser = await this.userRepository.create(newUser);

    await this.userRepository.save(createdUser);

    return createdUser.toResponseObject(); //fix it when add jwt
  }

  async updateUser(body: UpdateUserDto, userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(
        {
          error: 'User not found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser = {
      id: userId,
      name: body.name ? body.name : user.name,
      email: body.email ? body.email : user.email,
      password: body.password ? bcrypt.hash(body.password, 10) : user.password,
      avatarUrl: body.avatarUrl ? body.avatarUrl : user.avatarUrl,
    };

    const newUser = await this.userRepository.save(updatedUser);

    return newUser;
  }

  async getUser(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        {
          error: 'User with this email not exist',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
