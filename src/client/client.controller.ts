// src/fruits/fruits.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Put,
  // Delete,
} from '@nestjs/common';

import { ClientService } from './client.service';
import { FruitEntity } from '../entities/fruit.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Post()
  create(@Body() fruit: Partial<FruitEntity>) {
    return this.clientService.create(fruit);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateData: Partial<FruitEntity>) {
  //   return this.clientService.update(+id, updateData);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientService.remove(+id);
  // }
}
