import { Module } from '@nestjs/common';

import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
  providers: [HarvestService],
  controllers: [HarvestController],
  exports: [HarvestService],
})
export class HarvestModule {}
