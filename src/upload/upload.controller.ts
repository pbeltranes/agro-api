import {
  BadRequestException,
  Controller,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ClientService } from 'client/client.service';
import { FarmerService } from 'farmer/farmer.service';
import { FruitService } from 'fruit/fruit.service';
import { HarvestService } from 'harvest/harvest.service';
import { memoryStorage, Multer } from 'multer';

import { UploadService } from './upload.service';

@Injectable()
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly fruitService: FruitService,
    private readonly clientService: ClientService,
    private readonly farmerService: FarmerService,
    private readonly harvestService: HarvestService,
  ) {}

  @ApiOperation({ summary: 'Upload a CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { files: 1, fileSize: 1024 * 1024 * 5 }, // 1 MB you can adjust size here
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['text/csv'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else if (file?.size > 1024 * 1024 * 5) {
          // 1MB
          cb(
            new BadRequestException('Max File Size Reached. Max Allowed: 1MB'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Multer.File) {
    try {
      const parsedData = await this.uploadService.parseCSV(file);
      const { rows, errors } =
        await this.uploadService.validateFile(parsedData);
      const harvest = [];
      for await (const row of rows) {
        const fruit = await this.fruitService.create({
          name: row.fruitName,
          varieties: [row.fruitVariety],
        });
        const client = await this.clientService.create({
          name: row.clientName,
          email: row.clientMail,
          lastName: row.clientLastName,
        });
        const farmer = await this.farmerService.create({
          name: row.farmerName,
          email: row.farmerMail,
          lastName: row.farmerLastName,
          lands: [{ location: row.landLocation, name: row.landName }],
        });

        if (fruit && client && farmer) {
          harvest.push(
            await this.harvestService.create({
              varietyId: fruit.varieties[0].id,
              clientId: client.id,
              landId: farmer.lands[0].id,
            }),
          );
        }
      }
      return {
        inserteds: {
          data: harvest,
          count: harvest.length,
        },
        errors: {
          data: errors,
          count: errors.length,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
