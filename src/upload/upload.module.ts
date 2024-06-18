import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';

import { UploadController } from './upload.controller';
import { FruitModule } from '../fruit/fruit.module';
@Module({
  imports: [FruitModule, CsvModule],
  controllers: [UploadController],
})
export class UploadModule {}
