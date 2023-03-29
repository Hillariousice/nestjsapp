import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate the user's credentials with the AuthService
    const user = await this.authService.validateUser(email, password);

    // If the user is not found, throw an error
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // If the user is found, create a JWT token and return it
    const token = await this.authService.createToken(user);
    return { token };
  }
}
