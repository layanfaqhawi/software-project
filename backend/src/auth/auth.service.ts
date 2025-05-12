import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service'; // Import UserService to access user-related methods
import { JwtService } from '@nestjs/jwt'; // Import JwtService to generate JWT tokens
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing and comparison
import { response } from 'express';
import { JwtPayload } from './jwtPayload.interface'; // Import JwtPayload interface for JWT payload structure

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Inject the UserService to access user-related methods
    private readonly jwtService: JwtService, // Inject the JwtService to generate JWT tokens
  ) {}

  async register(user: any) {
    console.log('user', user); // Log the user data for debugging
    return this.userService.createUser(user); // Call the UserService to create a new user
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email); // Find user by email
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // Return user if password matches
    }

    throw new UnauthorizedException('Invalid credentials'); // Throw an error if credentials are invalid
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, role: user.role }; // Create JWT payload with user email and ID

    return  {
      token: this.jwtService.sign(payload), // Generate JWT token
    };
  }
}

