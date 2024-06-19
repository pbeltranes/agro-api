import { Injectable, NotFoundException } from '@nestjs/common';
import { HarvestEntity } from 'entities/harvest.entity';
import { PrismaService } from 'providers/prisma/prisma.service';
import { NewHarvestDto } from 'schemas/new.harvest.dto';

@Injectable()
export class HarvestService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<HarvestEntity[]> {
    return this.prismaService.harvest.findMany({
      include: {
        variety: true,
        client: true,
        land: {
          include: { farmer: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<HarvestEntity> {
    const fruit = await this.prismaService.harvest.findUnique({
      where: { id },
      include: { variety: true },
    });
    if (!fruit) {
      throw new NotFoundException(`Harvest #${id} not found`);
    }
    return fruit;
  }

  async create(harvest: NewHarvestDto): Promise<HarvestEntity> {
    return this.prismaService.harvest.create({
      data: {
        variety: { connect: { id: harvest.varietyId } },
        client: { connect: { id: harvest.clientId } },
        land: { connect: { id: harvest.landId } },
      },
      include: {
        variety: true,
        client: true,
        land: {
          include: {
            farmer: true,
          },
        },
      },
    });
  }
}

// async update(id: number, updateData: Partial<any>): Promise<any> {
//   const updatedHarvest = await this.prismaService.farmer.update({
//     where: { id },
//     data: updateData,
//   });
//   if (!updatedHarvest) {
//     throw new NotFoundException(`Harvest #${id} not found`);
//   }
//   return updatedHarvest;
// }

// async remove(id: number): Promise<void> {
//   const result = await this.prismaService.farmer.delete({
//     where: { id },
//   });
//   if (result === null) {
//     throw new NotFoundException(`Harvest #${id} not found`);
//   }
// }
