import { IsString } from 'class-validator';

export class CreateHabitatDto {
  @IsString()
  name: string;
}
