import { Module } from '@nestjs/common';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
