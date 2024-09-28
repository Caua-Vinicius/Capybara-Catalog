import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CapybaraService } from './capybaras.service';
import { CreateCapybaraDto } from './dtos/createCapybaraDto';
import { UpdateCapybaraDto } from './dtos/updateCapybaraDto';

@Controller('capybaras')
export class CapybaraController {
  constructor(private readonly capybaraService: CapybaraService) {}

  @Post('create')
  async CreateCapybara(@Body() createCapybaraDto: CreateCapybaraDto) {
    try {
      const capybara =
        await this.capybaraService.createCapybara(createCapybaraDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Capybara created successfully',
        data: capybara,
      };
    } catch (error) {
      console.error('Error creating capybara: ', error.message);
      throw new InternalServerErrorException('Failed to create capybaras');
    }
  }

  @Get()
  async getAllCapybaras() {
    try {
      const capybaras = await this.capybaraService.getAllCapybaras();
      return {
        statusCode: HttpStatus.OK,
        message: 'Capybaras fetched successfully',
        data: capybaras,
      };
    } catch (error) {
      console.error('Error fetching capybaras: ', error.message);
      throw new InternalServerErrorException('Failed to fetch capybaras');
    }
  }

  @Get(':id')
  async getCapybaraById(@Param('id') id: string) {
    try {
      const capybara = await this.capybaraService.getCapybaraById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Capybara fetched successfully',
        data: capybara,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Capybara with ID ${id} not found`);
      }
      console.error('Error fetching capybara by ID:', error.message);
      throw new InternalServerErrorException(
        'An error occurred while fetching the capybara',
      );
    }
  }

  @Get('habitat/:habitatId')
  async getCapybarasByHabitat(@Param('habitatId') habitatId: string) {
    if (!habitatId || habitatId.trim() === '') {
      throw new BadRequestException('The habitatId must be provided.');
    }
    try {
      const capybaras =
        await this.capybaraService.getCapybarasbyHabitat(habitatId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Capybaras fetched successfully',
        data: capybaras,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Habitat with ID ${habitatId} not found`);
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching capybara',
      );
    }
  }

  @Delete('delete/:id')
  async deleteCapybara(@Param('id') id: string) {
    try {
      const deletedCapybara = await this.capybaraService.deleteCapybara(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Capybara deleted successfully',
        data: deletedCapybara,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Capybara with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting capybara',
      );
    }
  }

  @Put('update/:id')
  async updateCapybara(
    @Param('id') id: string,
    @Body() updateCapybaraDto: UpdateCapybaraDto,
  ) {
    try {
      const updatedCapybara = await this.capybaraService.updateCapybara(
        id,
        updateCapybaraDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Capybara updated successfully',
        data: updatedCapybara,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Capybara with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'An error occurred while updating capybara',
      );
    }
  }
}
