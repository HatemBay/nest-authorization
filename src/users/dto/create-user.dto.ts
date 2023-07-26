import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
