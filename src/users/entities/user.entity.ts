import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: Role;

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable()
  // roles: Role[];
}
