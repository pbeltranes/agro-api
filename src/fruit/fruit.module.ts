import { Module } from '@nestjs/common';
import { PrismaService } from 'providers/prisma/prisma.service';

import { FruitController } from './fruit.controller';
import { FruitService } from './fruit.service';

@Module({
  providers: [FruitService, PrismaService],
  controllers: [FruitController],
  exports: [FruitService],
})
export class FruitModule {}
