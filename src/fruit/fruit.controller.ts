import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  BadRequestException,
  // Put,
  // Delete,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NewFruitDto } from 'schemas/new.fruit.dto';

import { FruitService } from './fruit.service';
import { FruitEntity } from '../entities/fruit.entity';

@ApiTags('fruit')
@Controller('fruit')
@UsePipes(ZodValidationPipe)
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Get()
  findAll(): Promise<FruitEntity[]> {
    try {
      return this.fruitService.findAll();
    } catch (e) {
      new BadRequestException(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.fruitService.findOne(+id);
    } catch (e) {
      new BadRequestException(e);
    }
  }

  @Post()
  @ApiBody({ type: NewFruitDto })
  async create(@Body() fruit: NewFruitDto) {
    try {
      return this.fruitService.create(fruit);
    } catch (e) {
      new BadRequestException(e);
    }
  }
}
