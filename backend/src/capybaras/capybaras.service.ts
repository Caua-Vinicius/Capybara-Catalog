import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { CreateCapybaraDto } from './dtos/createCapybaraDto';
import { Capybara } from '@prisma/client';

@Injectable()
export class CapybaraService {
  constructor(private readonly prisma: PrismaService) {}

  async createCapybara(
    createCapybaraDto: CreateCapybaraDto,
  ): Promise<Capybara> {
    const capybara = await this.prisma.capybara.create({
      data: {
        name: createCapybaraDto.name,
        age_years: createCapybaraDto.age_years,
        weight_kg: createCapybaraDto.weight_kg,
        health_status: createCapybaraDto.health_status,
        habitatId: createCapybaraDto.habitatId,
        behaviour: createCapybaraDto.behaviour,
        diet: createCapybaraDto.diet,
        observations: createCapybaraDto.observations,
      },
    });
    return capybara;
  }

  async getAllCapybaras(): Promise<Capybara[]> {
    const capybaras = await this.prisma.capybara.findMany();
    return capybaras;
  }

  async getCapybaraById(id: string): Promise<Capybara> {
    const capybara = await this.prisma.capybara.findFirst({
      where: {
        id: id,
      },
    });
    if (!capybara) {
      throw new NotFoundException(`Capybara with ID ${id} not found`);
    }
    return capybara;
  }
}
