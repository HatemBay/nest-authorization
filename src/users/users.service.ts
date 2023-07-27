import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, // private readonly rolesService: RolesService,
  ) {}

  // async getRoles(): Promise<string[]> {
  //   let roles: string[];
  //   (await this.rolesService.findAll()).forEach((data) =>
  //     roles.push(data.name),
  //   );
  //   return roles;
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { username: username },
        relations: ['roles'],
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (user) {
      ({ username: user.username } = updateUserDto);
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);

    return await this.usersRepository.remove(user);
  }
}
