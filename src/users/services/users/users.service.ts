import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOneUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`USUARIO ${id} NO EXISTE`);
    }
    return user;
  }
  async findByUserName(userName: string) {
    const user = await this.userRepo.findOne({ where: { userName: userName } });
    if (!user) {
      throw new NotFoundException(`USUARIO ${userName} NO EXISTE`);
    }
    return user;
  }
  async validateUserByUserName(userName: string) {
    const user = await this.userRepo.findOne({
      where: { userName: userName },
    });
    if (user) {
      throw new NotFoundException(`USUARIO ${userName} YA EXISTE`);
    }
    return user;
  }
  async create(data: CreateUserDto) {
    const verify = await this.validateUserByUserName(data.userName);
    if (!verify) {
      const newUser = this.userRepo.create(data);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      try {
        const create = await this.userRepo.save(newUser);
        return create;
      } catch (error) {
        console.log('error', error);
        if (error.code === '23505') {
          throw new NotFoundException(
            `USUARIO YA EXISTE POR FAVOR VERIFIQUE LOS DATOS INGRESADOS `,
          );
        }
      }
    }
  }
  async update(id: string, changes: UpdateUserDto) {
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
