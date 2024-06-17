import { UploadModule } from './upload/upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FruitsModule } from './fruits/fruits.module';
import { UploadController } from './upload/upload.controller';
import { PrismaModule } from './providers/prisma/prisma.module';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    CsvModule,
    UploadModule,
    ConfigModule.forRoot(),
    PrismaModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FruitsModule,
  ],
})
export class AppModule {}
