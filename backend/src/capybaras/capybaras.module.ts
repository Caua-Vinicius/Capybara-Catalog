import { Module } from '@nestjs/common';
import { CapybaraController } from './capybaras.controller';
import { CapybaraService } from './capybaras.service';
import { PrismaService } from 'prisma/prismaService';

@Module({
  controllers: [CapybaraController],
  providers: [CapybaraService, PrismaService],
})
export class CapybaraModule {}
