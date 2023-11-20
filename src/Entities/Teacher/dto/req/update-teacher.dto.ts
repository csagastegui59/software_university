import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly last_name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsArray()
  @IsOptional()
  readonly courses?: number[];
}
