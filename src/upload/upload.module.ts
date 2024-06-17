import { Module } from '@nestjs/common';
import { FruitsModule } from 'src/fruits/fruits.module';
import { UploadController } from './upload.controller';
import { CsvModule } from 'nest-csv-parser';
@Module({
  imports: [FruitsModule, CsvModule],
  controllers: [UploadController],
})
export class UploadModule {}

