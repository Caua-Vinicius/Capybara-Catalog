import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCapybaraDto {
  @IsString()
  name: string;

  @IsNumber()
  age_years: number;

  @IsNumber()
  weight_kg: number;

  @IsString()
  health_status: string;

  @IsString()
  habitatId: string;

  @IsString()
  behaviour: string;

  @IsString()
  @IsOptional()
  diet?: string;

  @IsString()
  observations: string;
}
