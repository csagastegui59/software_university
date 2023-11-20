import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.interface';
import { CreateEnrollmentDto } from './dto/req/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/req/update-enrollment.dto';

@Controller('/enrollments')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}
  @Get()
  @CacheKey('enrollmentsgetall')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentService.getAllEnrollments();
  }

  @Get('/:id')
  @CacheKey('enrollmentsgetone')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  getTeacherById(@Param('id') id: string): Promise<Enrollment> {
    return this.enrollmentService.getEnrollmentById(id);
  }

  @Post()
  createEnrollment(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentService.createEnrollment(createEnrollmentDto);
  }

  @Put('/:id')
  updateEnrollment(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentService.updateEnrollment(id, updateEnrollmentDto);
  }
}
