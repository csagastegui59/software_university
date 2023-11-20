import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/req/create-teacher.dto';
import { UpdateTeacherDto } from './dto/req/update-teacher.dto';
import { Teacher } from './teacher.interface';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}
  @Get()
  getAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get('/:teacherId')
  getTeacherById(@Param('teacherId') teacherId: string): Promise<Teacher> {
    return this.teacherService.getTeacherById(teacherId);
  }

  @Post()
  createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Put('/:teacherId')
  updateTeacher(
    @Param('teacherId') teacherId: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.updateTeacher(teacherId, updateTeacherDto);
  }
}
