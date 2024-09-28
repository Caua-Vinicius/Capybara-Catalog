import { Module } from '@nestjs/common';
import { HabitatController } from './habitats.controller';
import { HabitatService } from './habitats.service';
import { PrismaService } from 'prisma/prismaService';

@Module({
  controllers: [HabitatController],
  providers: [HabitatService, PrismaService],
})
export class HabitatatModule {}
