import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity({ name: 'user_posts' })
export class Post {
    constructor() {
        this.id = uuid();
      }
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  username: string;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column()
  description: string;
  @Column({ type: 'json', nullable: true })
  likes: Record<string, boolean>;
  @Column({ nullable: true })
  comments: string;
  @ManyToOne(() => User, user => user.posts)
  user: User;
}