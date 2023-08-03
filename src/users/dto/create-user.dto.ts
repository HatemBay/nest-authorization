import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  // * I used a dto rather than the very module because in testing it would require me to include the id
  // * this is subject to change as I learn moree about the topic

  // * -> So apparently calling the DTO of the object in relation with our class is better than calling it directly
  // * which makes sense since we are going to CREATE that object with our class which would optimally call for
  // * its create DTO
  roles: CreateRoleDto[];
}
