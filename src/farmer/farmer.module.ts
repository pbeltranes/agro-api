import { Module } from '@nestjs/common';

import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

@Module({
  providers: [FarmerService],
  controllers: [FarmerController],
  exports: [FarmerService],
})
export class FruitsModule {}
