import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @Column('text', { array: true })
  // // @Column()
  // roles: Role[];

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable()
  // roles: Role[];
}
