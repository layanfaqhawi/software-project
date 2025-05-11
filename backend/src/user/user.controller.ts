import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  getAllUsers() {
    return this.userService.users(); // Fetch all users from the database
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('STUDENT') // Use the correct Roles decorator
  @Get('studentDashboard')
  async getStudentDashboard(@Req() req: Request) {
    const email = req['user'].email; // Extract email from the request object
    const data = await this.userService.getStudentDashboard(email); // Fetch student dashboard data based on email
    return { data: data, redirect: '/studentDashboard' }; // Return the data and redirect path
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTRUCTOR')
  @Get('instructorDashboard')
  async getInstructorDashboard(@Req() req: Request) {
    const email = req['user'].email; // Extract email from the request object
    const data = await this.userService.getInstructorDashboard(email); // Fetch instructor dashboard data based on email
    return { data: data, redirect: '/instructorDashboard' }; // Return the data and redirect path
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('adminDashboard')
  async getAdminDashboard(@Req() req: Request) {
    const email = req['user'].email; // Extract email from the request object
    const data = await this.userService.getAdminDashboard(email); // Fetch admin dashboard data based on email
    return { data: data, redirect: '/adminDashboard' }; // Return the data and redirect path
  }
}
