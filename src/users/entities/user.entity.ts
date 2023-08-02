import { Role } from '../../roles/entities/role.entity';
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

  // * We will not include roles or users (in role entity) for now since they are causing trouble in testing
  // * -> w̶e̶̶̶ ̶̶̶n̶̶̶e̶̶̶e̶̶̶d̶̶̶ ̶̶̶t̶̶̶o̶̶̶ ̶̶̶m̶̶̶o̶̶̶c̶̶̶k̶̶̶ ̶̶̶t̶̶̶h̶̶̶e̶̶̶ ̶̶̶u̶̶̶s̶̶̶e̶̶̶r̶̶̶ ̶̶̶e̶̶̶n̶̶̶t̶̶̶i̶̶̶t̶̶̶y̶̶̶ ̶̶̶i̶̶̶n̶̶̶ ̶̶̶a̶̶̶ ̶̶̶w̶̶̶a̶̶̶y̶̶̶ ̶̶̶t̶̶̶h̶̶̶a̶̶̶t̶̶̶ ̶̶̶w̶̶̶o̶̶̶u̶̶̶l̶̶̶d̶̶̶ ̶̶̶n̶̶̶o̶̶̶t̶̶̶ ̶̶̶i̶̶̶n̶̶̶c̶̶̶l̶̶̶u̶̶̶d̶̶̶e̶̶̶ ̶̶̶i̶̶̶t̶̶̶s̶̶̶ ̶̶̶r̶̶̶e̶̶̶l̶̶̶a̶̶̶t̶̶̶i̶̶̶o̶̶̶n̶̶̶s̶̶̶h̶̶̶i̶̶̶p̶̶̶s̶̶̶ ̶̶̶
  // * -> Seems that the issue was with teh path, so instead of absolute paths we should implement relative paths
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
