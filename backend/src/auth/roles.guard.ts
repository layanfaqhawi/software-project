import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        if (!roles) return true; // No roles required, allow access

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assuming user is attached to the request by a previous middleware or guard

        return roles.includes(user.role); // Check if user has the required role
    }
}
// This guard checks if the user has the required roles to access a route
// It uses the Reflector service to get the roles metadata set by the Roles decorator
// If the user has the required role, access is granted; otherwise, it is denied
