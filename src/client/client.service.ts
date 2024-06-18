/* eslint-disable @typescript-eslint/no-unused-vars */
// src/fruits/fruits.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

import { FruitEntity } from '../entities/fruit.entity';

@Injectable()
export class ClientService {
  constructor() {} // @InjectRepository(Fruit)
  // private readonly fruitsRepository: Repository<Fruit>,

  async findAll(): Promise<any[]> {
    return [];
    // return this.fruitsRepository.find();
  }

  async findOne(id: number): Promise<any> {
    // const fruit = await this.fruitsRepository.findOne(id);
    // if (!fruit) {
    //   throw new NotFoundException(`Fruit #${id} not found`);
    // }
    // return fruit;
  }

  async create(fruit: any): Promise<any> {
    // const newFruit = this.fruitsRepository.create(fruit);
    // return this.fruitsRepository.save(newFruit);
  }

  // async update(id: number, updateData: Partial<any>): Promise<any> {
  //   // await this.fruitsRepository.update(id, updateData);
  //   // const updatedFruit = await this.fruitsRepository.findOne(id);
  //   // if (!updatedFruit) {
  //   //   throw new NotFoundException(`Fruit #${id} not found`);
  //   // }
  //   // return updatedFruit;
  // }

  // async remove(id: number): Promise<void> {
  //   //     const result = await this.fruitsRepository.delete(id);
  //   //     if (result.affected === 0) {
  //   //       throw new NotFoundException(`Fruit #${id} not found`);
  //   //     }
  //   //   }
  // }
}
