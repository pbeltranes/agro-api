import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from 'client/client.module';
import { CsvModule } from 'nest-csv-parser';

import { FruitModule } from './fruit/fruit.module';
import { HarvestModule } from './harvest/harvest.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    CsvModule,
    UploadModule,
    ConfigModule.forRoot(),
    PrismaModule,
    FruitModule,
    HarvestModule,
    ClientModule,
  ],
})
export class AppModule {}
