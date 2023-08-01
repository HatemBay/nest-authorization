import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // * Refer in the comment in user.entity.ts
  // @ManyToMany(() => User, (user) => user.roles)
  // users: User[];
}
