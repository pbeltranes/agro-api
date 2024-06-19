import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NewHarvestDto } from 'schemas/new.harvest.dto';

import { HarvestService } from './harvest.service'; 
@ApiTags('harvest') 
@Controller('harvest') 
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {
    // Update service name to harvestService
  }

  @Get()
  findAll() {
    return this.harvestService.findAll(); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(+id); 
  }

  @Post()
  @ApiBody({ type: NewHarvestDto })
  async create(@Body() harvest: NewHarvestDto) {
    return this.harvestService.create(harvest); 
  }

}
