import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UpdateUserPostDto } from 'src/users/dtos/UpdateUserPost.dto';
import { UsersService } from 'src/users/servces/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getusers() {
    return this.userService.findUsers();
  }
  @Post()
  async registerUser(@Body(new ValidationPipe()) registerDto: CreateUserDto) {
    const newUser = await this.userService.createUser(registerDto);
    return newUser;
  }
  @Put(':id')
  async updateUserbyId(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async deleteUserbyId(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id') id: string,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
  @Put(':id/posts')
  updateUserPost(
    @Param('id') id: string,
    @Body() updateUserPostDto: UpdateUserPostDto,
  ) {
    return this.userService.updateUserPost(id, updateUserPostDto);
  }
  @Delete(':id/posts')
  async deletePostbyId(@Param('id') id: string) {
    await this.userService.deletePost(id);
  }
  @Post(':id/like')
  async likePost(@Param('id') id: string,
  @Body('userId') userId: string) {
    const updatedPost = await this.userService.likePost(id, userId);
    return { message: 'Feeds was retrieved successfully', updatedPost };
  }
  @Get()
  getposts() {
    return this.userService.findPost();
  }
}
