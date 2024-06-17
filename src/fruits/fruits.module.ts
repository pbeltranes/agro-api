import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';

@Module({
  providers: [FruitsService],
  controllers: [FruitsController],
  exports: [FruitsService],
})
export class FruitsModule {}
