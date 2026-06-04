import { IsArray, IsInt, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SocioCobroDto {
  @IsString()
  nombre?: string;

  @IsNumber()
  cuota?: number;

  @IsInt()
  @Min(0)
  dias_atraso?: number;
}

export class CobrosDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocioCobroDto)
  socios?: SocioCobroDto[];
}