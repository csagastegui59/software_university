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
import { Student } from './student.interface';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/req/create-student.dto';
import { UpdateStudentDto } from './dto/req/update-student.dto';

@Controller('/students')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  @CacheKey('studentsgetall')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('/:id')
  @CacheKey('studentsgetone')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  getStudentById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Put('/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.updateStudent(id, updateStudentDto);
  }
}
