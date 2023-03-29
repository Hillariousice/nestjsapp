import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Post } from 'src/typeorm/entities/Post';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './servces/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
