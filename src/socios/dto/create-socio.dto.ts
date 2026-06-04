import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateSocioDto {
  @IsUUID()
  planId?: string;

  @IsString()
  nombre?: string;

  @IsString()
  cedula?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  dias_atraso?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}