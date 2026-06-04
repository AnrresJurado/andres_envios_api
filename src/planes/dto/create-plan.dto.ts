import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  nombre?: string;

  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}