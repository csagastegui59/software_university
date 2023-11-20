import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TeacherController } from './Entities/Teacher/teacher.controller';
import { TeacherService } from './Entities/Teacher/teacher.service';
import { PrismaService } from './prisma.service';
import { CourseController } from './Entities/Course/course.controller';
import { CourseService } from './Entities/Course/course.service';
import { StudentController } from './Entities/Student/student.controller';
import { StudentService } from './Entities/Student/student.service';
import { EnrollmentController } from './Entities/Enrollment/enrollment.controller';
import { EnrollmentService } from './Entities/Enrollment/enrollment.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { HealthController } from './health.controller';

const isCacheEnabled = process.env.CACHE_ENABLED === 'true';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 60,
      max: 10,
      isCacheEnabled: isCacheEnabled,
    }),
  ],
  controllers: [
    AppController,
    TeacherController,
    CourseController,
    StudentController,
    EnrollmentController,
    HealthController,
  ],
  providers: [
    AppService,
    TeacherService,
    PrismaService,
    CourseService,
    StudentService,
    EnrollmentService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
