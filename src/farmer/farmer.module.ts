import { Module } from '@nestjs/common';
import { PrismaModule } from 'providers/prisma/prisma.module';

import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

@Module({
  providers: [FarmerService],
  controllers: [FarmerController],
  imports: [PrismaModule],
  exports: [FarmerService],
})
export class FarmerModule {}
