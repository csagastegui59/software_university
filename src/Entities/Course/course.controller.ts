import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.interface';
import { CreateCourseDto } from './dto/req/create-course.dto';
import { UpdateCourseDto } from './dto/req/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Get()
  getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get('/:courseId')
  getCourseById(@Param('courseId') courseId: string): Promise<Course> {
    return this.courseService.getCourseById(courseId);
  }

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put('/:courseId')
  updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.updateCourse(courseId, updateCourseDto);
  }
}
