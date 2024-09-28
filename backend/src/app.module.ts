import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import { HabitatatModule } from './habitats/habitats.module';
import { CapybaraModule } from './capybaras/capybaras.module';

@Module({
  imports: [HabitatatModule, CapybaraModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
