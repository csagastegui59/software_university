import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Student } from './student.interface';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/req/create-student.dto';
import { UpdateStudentDto } from './dto/req/update-student.dto';

@Controller('/students')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('/:id')
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
