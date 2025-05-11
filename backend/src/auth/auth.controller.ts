import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    console.log('data', data); // Log the registration data for debugging
    return this.authService.register(data); // Register a new user
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const user = await this.authService.validateUser(data.email, data.password); // Validate user credentials
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const tokenObj = await this.authService.login(user); // Generate JWT token
    response.cookie('jwt', tokenObj.token, { httpOnly: true }); // Set token in cookie

    const role = user['role']; // Get user role
    let redirectPath = '';

    if (role === 'STUDENT') {
      redirectPath = '/user/studentDashboard';
    } else if (role === 'INSTRUCTOR') {
      redirectPath = '/user/instructorDashboard';
    } else if (role === 'ADMIN') {
      redirectPath = '/user/adminDashboard';
    } else {
      return response.status(403).json({ message: 'Forbidden' }); // Forbidden access for other roles
    }

    return response.json({ token: tokenObj.token, redirect: redirectPath }); // Return token and redirect path
  }
}
