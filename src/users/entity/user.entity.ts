import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'usuarios' })
@Index(['id', 'email', 'userName'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, unique: true, name: 'username' })
  userName: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  fullName: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creacion: Date;
}
