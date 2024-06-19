import { Module } from '@nestjs/common';
import { ClientModule } from 'client/client.module';
import { FarmerModule } from 'farmer/farmer.module';
import { FruitModule } from 'fruit/fruit.module';
import { HarvestModule } from 'harvest/harvest.module';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [FarmerModule, FruitModule, HarvestModule, ClientModule],
})
export class UploadModule {}
