import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Put,
  // Delete,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NewHarvestDto } from 'schemas/new.harvest.dto';

import { HarvestService } from './harvest.service'; // Update import to HarvestService

@ApiTags('harvest') // Update controller tag to 'harvest'
@Controller('harvest') // Update controller path to 'harvests'
export class HarvestController {
  // Update controller class name to HarvestsController
  constructor(private readonly harvestService: HarvestService) {
    // Update service name to harvestService
  }

  @Get()
  findAll() {
    return this.harvestService.findAll(); // Update service method to findAll
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(+id); // Update service method to findOne
  }

  @Post()
  @ApiBody({ type: NewHarvestDto })
  async create(@Body() harvest: NewHarvestDto) {
    return this.harvestService.create(harvest); // Update service method to create
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateData: Partial<HarvestEntity>) {
  //   return this.harvestService.update(+id, updateData); // Update service method to update
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.harvestService.remove(+id); // Update service method to remove
  // }
}
