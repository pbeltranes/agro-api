import { Module } from '@nestjs/common';
import { PrismaModule } from 'providers/prisma/prisma.module';

import { FruitController } from './fruit.controller';
import { FruitService } from './fruit.service';

@Module({
  providers: [FruitService],
  controllers: [FruitController],
  exports: [FruitService],
  imports: [PrismaModule],
})
export class FruitModule {}
