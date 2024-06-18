import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FarmerEntity } from 'entities/farmer.entity';
import { NewFarmerDto } from 'schemas/new.farmer.dto';

@Injectable()
export class PrismaService extends PrismaClient {
  formatVarieties(varieties: string[]) {
    return varieties.map((variety) => {
      return {
        name: variety,
      };
    });
  }

  landCodeDto(farmer: NewFarmerDto): string[] {
    return farmer.lands.map((land) => `${land.location}_${land.name}`);
  }
  landCodeEntity(farmer: FarmerEntity): string[] {
    return farmer.lands.map((land) => `${land.location}_${land.name}`);
  }
}
