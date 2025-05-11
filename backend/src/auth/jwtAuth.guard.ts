import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader) return false; // No authorization header present

        const token = authHeader.split(' ')[1]; // Extract the token from the header
         try {
            const payload = this.jwtService.verify(token); // Verify the token
            request['user'] = payload; // Attach the payload to the request object
            return true; // Token is valid, allow access
         } catch (error) {
            return false; // Token verification failed, deny access
         }

    }
}