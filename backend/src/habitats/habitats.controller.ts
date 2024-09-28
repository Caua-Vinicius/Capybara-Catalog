import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { HabitatService } from './habitats.service';
import { CreateHabitatDto } from './dtos/createHabitatDto';

@Controller('habitats')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  @Post('create')
  async createHabitat(@Body() createHabitatDto: CreateHabitatDto) {
    try {
      const habitat = await this.habitatService.createHabitat(createHabitatDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Habitat created successfully',
        data: habitat,
      };
    } catch (error) {
      console.error('Error creating Habitat: ', error.message);
      return {
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create Habitat',
        error: error.message || 'An unexpected error occurred',
      };
    }
  }

  @Get('')
  async getAllHabitats() {
    try {
      const habitats = await this.habitatService.getAllHabitats();
      return {
        statusCode: HttpStatus.OK,
        message: 'Fetched all habitats ',
        data: habitats,
      };
    } catch (error) {
      console.error('Error fetching Habitats: ', error.message);
      return {
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch Habitats',
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
}
