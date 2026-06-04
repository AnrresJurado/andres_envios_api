import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}