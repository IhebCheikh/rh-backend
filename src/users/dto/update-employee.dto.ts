import { IsOptional, IsString, IsDateString } from '@nestjs/class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;
}