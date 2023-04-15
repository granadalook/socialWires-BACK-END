import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';

@Entity()
@Index(['id'])
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  texto: string;

  @CreateDateColumn({
    name: 'creado',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
