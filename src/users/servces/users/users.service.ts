import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Post } from 'src/typeorm/entities/Post';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import {
  UpdateUserParams,
  CreateUserPostParams,
  UpdateUserPostParams,
} from 'src/utils/types';
import { FindOneOptions, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async findUsers() {
    return await this.userRepository.find({});
  }
  async findOneByEmail(email: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { email } };
    return await this.userRepository.findOne(options);
  }
  async createUser(userDetails: CreateUserDto) {
    const hashedPassword = await hash(userDetails.password, 10);
    const newUserDetails = {
      username: userDetails.username,
      email: userDetails.email,
      password: hashedPassword,
      confirm_password: hashedPassword,
    };
    const createdUser = await this.userRepository.create({
      ...newUserDetails,
      createdAt: new Date(),
    });
    return await this.userRepository.save(createdUser);
  }
  async updateUser(id: string, updateUserDetails: UpdateUserParams) {
    return await this.userRepository.update(
      { id },
      {
        ...updateUserDetails,
      },
    );
  }
  async deleteUser(id: string) {
    return await this.userRepository.delete({ id });
  }

  async createUserPost(
    id: string,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }
  async updateUserPost(id: string, updatePostDetails: UpdateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot update Profile',
        HttpStatus.BAD_REQUEST,
      );
    return await this.userRepository.update(
      { id },
      {
        ...updatePostDetails,
      },
    );
  }
  async deletePost(id: string) {
    return await this.postRepository.delete({ id });
  }
  async likePost(id: string, userId: string): Promise<Post> {
    const post = await this.postRepository.findOne(id);

    // Retrieve the likes object from the "likes" column
    const likes = post.likes || {};

    // Toggle the like status for the user
    if (likes[userId]) {
      delete likes[userId];
    } else {
      likes[userId] = true;
    }

    // Update the "likes" column with the new likes object
    post.likes = likes;

    // Save the updated post and return it
    return this.postRepository.save(post);
  }
  async findPost() {
    return await this.postRepository.find();
  }
}
