import { Module } from '@nestjs/common';
import { PrismaService } from 'providers/prisma/prisma.service';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  providers: [ClientService, PrismaService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
