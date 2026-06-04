import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class UpdateSocioDto {
  @IsOptional()
  @IsUUID()
  planId?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
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