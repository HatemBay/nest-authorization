import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import { Column } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  roles: Role[];
}
