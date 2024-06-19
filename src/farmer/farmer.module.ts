import { Module } from '@nestjs/common';
import { PrismaService } from 'providers/prisma/prisma.service';

import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

@Module({
  providers: [FarmerService, PrismaService],
  controllers: [FarmerController],
  exports: [FarmerService],
})
export class FarmerModule {}
