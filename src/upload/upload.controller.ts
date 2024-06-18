import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { CsvParser } from 'nest-csv-parser';
import { ParseResult } from 'papaparse';

import { FruitService } from '../fruit/fruit.service';
// import {  } from '../entities/fruit.entity';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly fruitService: FruitService,
    private readonly csvParser: CsvParser,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const parsedData: ParseResult<any> = await this.csvParser.parse(
      file.buffer,
      { Fruit: 'name', Color: 'color', Price: 'price' },
    );
    const fruits = parsedData.data;
    for (const fruit of fruits) {
      await this.fruitService.create(fruit);
    }
    return { message: 'CSV data successfully uploaded' };
  }
}
