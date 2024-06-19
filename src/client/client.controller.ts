// src/fruits/fruits.controller.ts
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
import { NewClientDto } from 'schemas/new.client.dto';

import { ClientService } from './client.service';

@ApiTags('client')
@Controller('client')
@UsePipes(ZodValidationPipe)
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
  @ApiBody({ type: NewClientDto })
  async create(@Body() client: NewClientDto) {
    return this.clientService.create(client);
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
