// src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvParser } from 'nest-csv-parser';
import { FruitsService } from '../fruits/fruits.service';
import { Fruit } from '../entities/fruit.entity';
import { ParseResult } from 'papaparse';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly fruitsService: FruitsService,
    private readonly csvParser: CsvParser,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const parsedData: ParseResult<Fruit> = await this.csvParser.parse(
      file.buffer,
      Fruit,
    );
    const fruits = parsedData.data;
    for (const fruit of fruits) {
      await this.fruitsService.create(fruit);
    }
    return { message: 'CSV data successfully uploaded' };
  }
}
