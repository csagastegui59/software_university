import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsNumber()
  @IsOptional()
  studentId?: number;

  @IsNumber()
  @IsOptional()
  courseId?: number;

  @IsNumber()
  @IsOptional()
  @IsIn([1, 2], { message: 'Season must be 1 or 2' })
  season?: number;

  @IsNumber()
  @IsOptional()
  @Min(1900, { message: 'Year must be greater than or equal to 1900' })
  @Max(2100, { message: 'Year must be less than or equal to 2100' })
  year?: number;
}
