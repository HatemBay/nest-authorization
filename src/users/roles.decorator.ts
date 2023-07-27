import { SetMetadata } from '@nestjs/common';

// Added a custom decorator based on SetMetadata that would directly add the role (or many roles directly) to metadata
// export const Roles = (...roles: Role[]) => {
//   const roleNames: string[] = [];
//   roles.forEach((role) => roleNames.push(role.name));

//   return SetMetadata('roles', roleNames);
// };

// *Nb: The reason I didn't make role an enum is because sqlite is preventing me from accessing the array of string that represents roles in a user
// *so I can't retrieve it from my current user or put it in my payload, guess it's better to make a more scalable role display anyway
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
