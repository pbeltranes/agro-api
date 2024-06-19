import { Module } from '@nestjs/common';
import { PrismaService } from 'providers/prisma/prisma.service';

import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
  providers: [HarvestService, PrismaService],
  controllers: [HarvestController],
  exports: [HarvestService],
})
export class HarvestModule {}
