import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import { CreateHabitatDto } from './dtos/createHabitatDto';
import { Habitat } from '@prisma/client';
import { UpdateHabitatDto } from './dtos/updateHabitatDto';

@Injectable()
export class HabitatService {
  constructor(private readonly prisma: PrismaService) {}

  async createHabitat(createHabitat: CreateHabitatDto): Promise<Habitat> {
    const habitat = await this.prisma.habitat.create({ data: createHabitat });
    return habitat;
  }

  async getAllHabitats(): Promise<Habitat[]> {
    const habitats = await this.prisma.habitat.findMany();
    return habitats;
  }

  async getHabitatByID(id: string): Promise<Habitat> {
    const habitat = await this.prisma.habitat.findFirst({
      where: {
        id: id,
      },
    });
    if (!habitat) {
      throw new NotFoundException(`Capybara with ID ${id} not found`);
    }
    return habitat;
  }

  async deleteHabitatByID(id: string): Promise<Habitat> {
    const deletedHabitat = await this.prisma.habitat.delete({
      where: {
        id: id,
      },
    });
    return deletedHabitat;
  }

  async updateHabitat(
    id: string,
    updateHabitatDto: UpdateHabitatDto,
  ): Promise<Habitat> {
    const updatedHabitat = await this.prisma.habitat.update({
      where: { id: id },
      data: updateHabitatDto,
    });
    return updatedHabitat;
  }
}
