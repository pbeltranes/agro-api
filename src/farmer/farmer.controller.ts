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
import { ApiBody } from '@nestjs/swagger';
import { NewFarmerDto } from 'schemas/new.farmer.dto';

import { FarmerService } from './farmer.service';

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Get()
  findAll() {
    return this.farmerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

  @Post()
  @ApiBody({ type: NewFarmerDto })
  create(@Body() fruit: NewFarmerDto) {
    return this.farmerService.create(fruit);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateData: Partial<FarmerEntity>) {
  //   return this.farmerService.update(+id, updateData);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.farmerService.remove(+id);
  // }
}
