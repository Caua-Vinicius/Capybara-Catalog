import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { CreateCapybaraDto } from './dtos/createCapybaraDto';
import { Capybara } from '@prisma/client';
import { UpdateCapybaraDto } from './dtos/updateCapybaraDto';

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

  async getCapybarasbyHabitat(habitatId: string): Promise<Capybara[]> {
    const habitat = await this.prisma.habitat.findUnique({
      where: {
        id: habitatId,
      },
    });

    if (!habitat) {
      throw new NotFoundException(`Habitat with ID ${habitatId} not found`);
    }

    const capybaras = await this.prisma.capybara.findMany({
      where: {
        habitatId: habitatId,
      },
      include: {
        habitat: true,
      },
    });
    return capybaras;
  }

  async deleteCapybara(id: string): Promise<Capybara> {
    const capybara = await this.prisma.capybara.delete({
      where: {
        id: id,
      },
    });
    return capybara;
  }

  async updateCapybara(
    id: string,
    updateCapybaraDto: UpdateCapybaraDto,
  ): Promise<Capybara> {
    const capybara = await this.prisma.capybara.update({
      where: { id: id },
      data: {
        name: updateCapybaraDto.name,
        age_years: updateCapybaraDto.age_years,
        weight_kg: updateCapybaraDto.weight_kg,
        health_status: updateCapybaraDto.health_status,
        habitatId: updateCapybaraDto.habitatId,
        behaviour: updateCapybaraDto.behaviour,
        diet: updateCapybaraDto.diet,
        observations: updateCapybaraDto.observations,
      },
    });
    return capybara;
  }
}
