import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import { CreateHabitatDto } from './dtos/createHabitatDto';
import { Habitat } from '@prisma/client';

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
}
