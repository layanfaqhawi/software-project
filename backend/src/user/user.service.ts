import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { password, role, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('data', data);
    console.log('hashedPassword', hashedPassword);

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        role: role.toUpperCase() as Role
      },
    });

    const userID = user.userID;

    if (role === 'STUDENT') {
      await this.prisma.student.create({
        data: {
          studentID: userID,
          level: 'New',
        },
      });
    } else if (role === 'INSTRUCTOR') {
      await this.prisma.instructor.create({
        data: {
          instructorID: userID,
          bio: 'New instructor bio',
        },
      });
    } else if (role === 'ADMIN') {
      await this.prisma.admin.create({
        data: {
          adminID: userID,
        },
      });
    }
    console.log('user in createUser', user); // Log the created user for debugging

    return user;
  }

  async findByEmail(email: string) {
    console.log('email in findByEmail', email); // Log the email for debugging
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getStudentDashboard(email: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ret = await this.prisma.student.findUnique({
      where: { studentID: user.userID },
    });
    if (!ret) return null; // Add null check for ret
    const data = {
      studentID: ret.studentID,
      level: ret.level,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
    return data;
  }

  async getInstructorDashboard(email: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ret = await this.prisma.instructor.findUnique({
      where: { instructorID: user.userID },
    });
    if (!ret) return null; // Add null check for ret
    const data = {
      instructorID: ret.instructorID,
      bio: ret.bio,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
    return data;
  }

  async getAdminDashboard(email: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ret = await this.prisma.admin.findUnique({
      where: { adminID: user.userID },
    });
    if (!ret) return null; // Add null check for ret
    const data = {
      adminID: ret.adminID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
    return data;
  }

  async users(): Promise<any[]> {
    return this.prisma.user.findMany();
  }
}
