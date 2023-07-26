import { SetMetadata } from '@nestjs/common';
import { Role } from './entities/role.enum';

// Added a custom decorator based on SetMetadata that would directly add the role to metadata
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);