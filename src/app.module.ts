import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from 'client/client.module';
import { FarmerModule } from 'farmer/farmer.module';

import { FruitModule } from './fruit/fruit.module';
import { HarvestModule } from './harvest/harvest.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot(),
    PrismaModule,
    FarmerModule,
    FruitModule,
    HarvestModule,
    ClientModule,
  ],
})
export class AppModule {}
