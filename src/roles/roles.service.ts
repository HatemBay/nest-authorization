import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['users'] });
  }

  async findOneById(id: number): Promise<Role> {
    try {
      const role = await this.rolesRepository.findOneOrFail({
        where: { id: id },
      });
      return role;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      const role = await this.rolesRepository.findOneOrFail({
        where: { id: id },
      });
      return role;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOneById(id);
    if (role) {
      ({ name: role.name } = updateRoleDto);
    }
    return await this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOneById(id);

    return await this.rolesRepository.remove(role);
  }
}
