import { IsString } from 'class-validator';

export class UpdateHabitatDto {
  @IsString()
  name: string;
}
