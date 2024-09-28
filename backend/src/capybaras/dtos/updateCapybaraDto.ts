import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCapybaraDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  age_years: number;

  @IsNumber()
  @IsOptional()
  weight_kg: number;

  @IsString()
  @IsOptional()
  health_status: string;

  @IsString()
  @IsOptional()
  habitatId: string;

  @IsString()
  @IsOptional()
  behaviour: string;

  @IsString()
  @IsOptional()
  diet?: string;

  @IsString()
  @IsOptional()
  observations: string;
}
