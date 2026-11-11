import { IsIn, IsOptional, IsString } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsIn(['Present', 'Absent', 'Leave'])
  status?: 'Present' | 'Absent' | 'Leave';
}
