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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NewFarmerDto } from 'schemas/new.farmer.dto';

import { FarmerService } from './farmer.service';

@ApiTags('farmer')
@Controller('farmer')
@UsePipes(ZodValidationPipe)
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
  async create(@Body() fruit: NewFarmerDto) {
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
