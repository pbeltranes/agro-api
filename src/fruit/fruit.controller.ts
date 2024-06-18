import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  // Put,
  // Delete,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { NewFruitDto } from 'schemas/new.fruit.dto';

import { FruitService } from './fruit.service';
import { FruitEntity } from '../entities/fruit.entity';

@Controller('fruit')
@UsePipes(ZodValidationPipe)
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Get()
  findAll(): Promise<FruitEntity[]> {
    return this.fruitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitService.findOne(+id);
  }

  @Post()
  @ApiBody({ type: NewFruitDto })
  async create(@Body() fruit: NewFruitDto) {
    console.log(fruit);
    try {
      return this.fruitService.create(fruit);
    } catch (e) {
      console.log(e);
    }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateData: Partial<FruitEntity>) {
  //   return this.fruitService.update(+id, updateData);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fruitService.remove(+id);
  // }
}
