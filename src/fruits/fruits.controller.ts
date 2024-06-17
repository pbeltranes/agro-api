// src/fruits/fruits.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { Fruit } from '../entities/fruit.entity';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Get()
  findAll() {
    return this.fruitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }

  @Post()
  create(@Body() fruit: Partial<Fruit>) {
    return this.fruitsService.create(fruit);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Fruit>) {
    return this.fruitsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}
