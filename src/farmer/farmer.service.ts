import { Injectable, NotFoundException } from '@nestjs/common';
import { FarmerEntity } from 'entities/farmer.entity';
import { PrismaService } from 'providers/prisma/prisma.service';
import { NewFarmerDto } from 'schemas/new.farmer.dto';

@Injectable()
export class FarmerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prismaService.farmer.findMany();
  }

  async findOne(id: number): Promise<any> {
    const farmer = await this.prismaService.farmer.findUnique({
      where: { id },
    });
    if (!farmer) {
      throw new NotFoundException(`Harvest #${id} not found`);
    }
    return farmer;
  }

  async create(farmer: NewFarmerDto): Promise<FarmerEntity> {
    const current = await this.prismaService.farmer.findUnique({
      where: { email: farmer.email },
      include: { lands: true },
    });
    // return current;
    if (!current) {
      return this.prismaService.farmer.create({
        data: {
          name: farmer.name,
          email: farmer.email,
          lastName: farmer.lastName,
          lands: {
            create: farmer.lands.map((land) => {
              return { location: land.location, name: land.name };
            }),
          },
        },
        include: {
          lands: true,
        },
      });
    }
    const landCodes = this.prismaService.landCodeDto(farmer);
    const existingLandCodes = this.prismaService.landCodeEntity(current);
    const newLandCodes = landCodes.filter(
      (landCode) => !existingLandCodes.includes(landCode),
    );
    if (newLandCodes.length === 0) return current;

    // que pasa si existe y esta creada la finca
    const newLands = await this.prismaService.land.createManyAndReturn({
      data: newLandCodes.map((landCode) => {
        const [location, name] = landCode.split('_');
        return { location, name, farmerId: current.id };
      }),
    });
    return {
      ...current,
      lands: [...current.lands, ...newLands],
    };
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
