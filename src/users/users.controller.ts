import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  roles: string[];
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Roles('ADMIN', 'USER')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles()
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
