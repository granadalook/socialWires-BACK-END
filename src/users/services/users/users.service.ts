import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { Like, Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['posts'] });
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`USUARIO ${id} NO EXISTE`);
    }
    return user;
  }
  async findByUserName(userName: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { userName: userName },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`USUARIO ${userName} NO EXISTE`);
    }
    return user;
  }
  async validateUserByUserName(userName: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { userName: userName },
    });
    if (user) {
      throw new NotFoundException(`USUARIO ${userName} YA EXISTE`);
    }
    return user;
  }
  async create(data: CreateUserDto): Promise<User> {
    const verify = await this.validateUserByUserName(data.userName);
    if (!verify) {
      const newUser = this.userRepo.create(data);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      try {
        const create = await this.userRepo.save(newUser);
        return create;
      } catch (error) {
        Logger.error('error');
        if (error.code === '23505') {
          throw new NotFoundException(
            `USUARIO YA EXISTE POR FAVOR VERIFIQUE LOS DATOS INGRESADOS `,
          );
        }
      }
    }
  }
  async findByFilter(text: string): Promise<User[]> {
    const user = await this.userRepo.find({
      where: [
        { userName: Like(`%${text}%`) },
        { fullName: Like(`%${text}%`) },
        { email: Like(`%${text}%`) },
      ],
    });
    if (!user) {
      throw new NotFoundException(`USER DE  ${text}  NO EXISTE`);
    }
    return user;
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }
  async delete(id: string) {
    const userDelete = await this.findOneUser(id);
    this.userRepo.delete(id);
    return {
      message: 'USUARIO ELIMINADO',
      userDelete,
    };
  }
}
