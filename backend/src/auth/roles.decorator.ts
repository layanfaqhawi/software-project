import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // Custom decorator to set roles metadata
// This decorator can be used to specify the roles required for a route or controller
// It uses NestJS's SetMetadata function to attach the roles to the route handler or controller
// The roles can then be accessed in guards or interceptors to enforce role-based access control
// Example usage:

// @Roles('admin')
// @Get('admin')
// getAdminData() {
//     return this.adminService.getData();
// }
// This would restrict access to the getAdminData method to only users with the 'admin' role
