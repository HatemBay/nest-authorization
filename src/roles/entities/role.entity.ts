import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from './role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
