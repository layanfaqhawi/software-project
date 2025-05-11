import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized: No authorization header' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        let payload;
        try {
            payload = this.jwtService.verify(token); // Verify the token
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req['user'] = payload; // Attach the payload to the request object
        
        if (payload.role === 'STUDENT') {
            return res.redirect('/studentDashboard'); // Redirect to student dashboard
        } else if (payload.role === 'INSTRUCTOR') {
            return res.redirect('/instructorDashboard'); // Redirect to instructor dashboard
        } else if (payload.role === 'ADMIN') {
            return res.redirect('/adminDashboard'); // Redirect to admin dashboard
        } else {
            return res.status(403).json({ message: 'Forbidden: Invalid role' }); // Forbidden access for other roles
        }
    }
}