import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
