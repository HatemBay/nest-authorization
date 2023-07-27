import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';

// Added a custom decorator based on SetMetadata that would directly add the role (or many roles directly) to metadata
// export const Roles = (...roles: Role[]) => {
//   const roleNames: string[] = [];
//   roles.forEach((role) => roleNames.push(role.name));

//   return SetMetadata('roles', roleNames);
// };

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
