import { Injectable, NotFoundException } from '@nestjs/common';
import { FruitEntity } from 'entities/fruit.entity';
import { PrismaService } from 'providers/prisma/prisma.service';
import { NewFruitDto } from 'schemas/new.fruit.dto';

@Injectable()
export class FruitService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<FruitEntity[]> {
    return this.prismaService.fruit.findMany({ include: { varieties: true } });
  }

  async findOne(id: number): Promise<FruitEntity> {
    const fruit = await this.prismaService.fruit.findUnique({
      where: { id },
      include: { varieties: true },
    });
    if (!fruit) {
      throw new NotFoundException(`Harvest #${id} not found`);
    }
    return fruit;
  }

  async create(fruit: NewFruitDto): Promise<FruitEntity> {
    const current = await this.prismaService.fruit.findUnique({
      where: { name: fruit.name },
      include: { varieties: true },
    });
    console.log(current);
    if (!current) {
      return this.prismaService.fruit.create({
        data: {
          name: fruit.name,
          varieties: {
            create: this.prismaService.formatVarieties(fruit.varieties),
          },
        },
        include: {
          varieties: true,
        },
      });
    }
    const pendingVarieties = fruit.varieties
      .filter((variety) => current.varieties.includes[variety])
      .map((variety) => {
        return {
          fruitId: current.id,
          name: variety,
        };
      });
    if (pendingVarieties.length === 0) return current;
    const newVarities = await this.prismaService.variety.createManyAndReturn({
      data: pendingVarieties,
    });
    return {
      ...current,
      varieties: [...current.varieties, ...newVarities],
    };
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
}
