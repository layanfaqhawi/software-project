import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [AuthModule, UserModule, StudentModule, InstructorModule, AdminModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
