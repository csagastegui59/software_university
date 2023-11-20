import { IsIn, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsIn([1, 2], { message: 'Season must be 1 or 2' })
  season: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1900, { message: 'Year must be greater than or equal to 1900' })
  @Max(2100, { message: 'Year must be less than or equal to 2100' })
  year: number;
}
