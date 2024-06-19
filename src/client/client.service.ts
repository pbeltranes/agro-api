import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from 'entities/client.entity';
import { PrismaService } from 'providers/prisma/prisma.service';
import { NewClientDto } from 'schemas/new.client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prismaService.client.findMany({});
  }

  async findOne(id: number): Promise<any> {
    const farmer = await this.prismaService.client.findUnique({
      where: { id },
    });
    if (!farmer) {
      throw new NotFoundException(`Harvest #${id} not found`);
    }
    return farmer;
  }

  async create(client: NewClientDto): Promise<ClientEntity> {
    const current = await this.prismaService.client.findUnique({
      where: { email: client.email },
    });
    if (!current) {
      return this.prismaService.client.create({
        data: {
          name: client.name,
          email: client.email,
          lastName: client.lastName,
        },
      });
    }
    return current;
  }
}
// async update(id: number, updateData: Partial<any>): Promise<any> {
//   const updatedHarvest = await this.prismaService.client.update({
//     where: { id },
//     data: updateData,
//   });
//   if (!updatedHarvest) {
//     throw new NotFoundException(`Harvest #${id} not found`);
//   }
//   return updatedHarvest;
// }

// async remove(id: number): Promise<void> {
//   const result = await this.prismaService.client.delete({
//     where: { id },
//   });
//   if (result === null) {
//     throw new NotFoundException(`Harvest #${id} not found`);
//   }
// }
