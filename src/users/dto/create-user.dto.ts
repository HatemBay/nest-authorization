import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;
}
