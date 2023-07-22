import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/entities/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
