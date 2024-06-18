import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HarvestService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<any[]> {
    return this.prisma.harvest.findMany();
  }

  async findOne(id: number): Promise<any> {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id },
    });
    if (!harvest) {
      throw new NotFoundException(`Harvest #${id} not found`);
    }
    return harvest;
  }

  async create(harvest: any): Promise<any> {
    return this.prisma.harvest.create({
      data: harvest,
    });
  }

  // async update(id: number, updateData: Partial<any>): Promise<any> {
  //   const updatedHarvest = await this.prisma.harvest.update({
  //     where: { id },
  //     data: updateData,
  //   });
  //   if (!updatedHarvest) {
  //     throw new NotFoundException(`Harvest #${id} not found`);
  //   }
  //   return updatedHarvest;
  // }

  // async remove(id: number): Promise<void> {
  //   const result = await this.prisma.harvest.delete({
  //     where: { id },
  //   });
  //   if (result === null) {
  //     throw new NotFoundException(`Harvest #${id} not found`);
  //   }
  // }
}
