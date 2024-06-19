import { Module } from '@nestjs/common';
import { PrismaModule } from 'providers/prisma/prisma.module';

import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
  providers: [HarvestService],
  imports: [PrismaModule],
  controllers: [HarvestController],
  exports: [HarvestService],
})
export class HarvestModule {}
