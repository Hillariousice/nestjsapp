import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Post } from './Post';

@Entity({ name: 'users' })
export class User {
  constructor() {
    this.id = uuid();
  }
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  confirm_password: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  phone: string;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  authStrategy: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
