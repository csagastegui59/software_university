import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
