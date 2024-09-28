import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CapybaraService } from './capybaras.service';
import { CreateCapybaraDto } from './dtos/createCapybaraDto';

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
      return {
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create capybara',
        error: error.message || 'An unexpected error occurred',
      };
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
      return {
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch capybaras',
        error: error.message || 'An unexpected error occurred',
      };
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
}
