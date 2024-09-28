import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
      throw new InternalServerErrorException('Failed to create Habitat');
    }
  }

  @Get('')
  async getAllHabitats() {
    try {
      const habitats = await this.habitatService.getAllHabitats();
      return {
        statusCode: HttpStatus.OK,
        message: 'Fetched all habitats successfully',
        data: habitats,
      };
    } catch (error) {
      console.error('Error fetching habitats: ', error.message);
      throw new InternalServerErrorException('Failed to fetch habitats');
    }
  }

  @Get(':id')
  async getHabitatByID(@Param('id') id: string) {
    try {
      const habitat = await this.habitatService.getHabitatByID(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Fetched habitat successfully ',
        data: habitat,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Habitat with ID ${id} not found`);
      }
      console.error('Error fetching habitat by ID:', error.message);
      throw new InternalServerErrorException(
        'An error occurred while fetching the habitat',
      );
    }
  }

  @Delete('delete/:id')
  async deleteHabitat(@Param('id') id: string) {
    try {
      const deletedHabitat = await this.habitatService.deleteHabitatByID(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted habitat successfully ',
        data: deletedHabitat,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Habtitat with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting habitat',
      );
    }
  }
}
