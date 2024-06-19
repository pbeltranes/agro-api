import { Test, TestingModule } from '@nestjs/testing';
import { FarmerEntity } from 'entities/farmer.entity';
import { NewFarmerDto } from 'schemas/new.farmer.dto';
import { beforeEach, describe, expect, it } from 'vitest';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should format varieties correctly', () => {
    const varieties = ['Apple', 'Orange', 'Banana'];
    const formattedVarieties = prismaService.formatVarieties(varieties);

    expect(formattedVarieties).toEqual([
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Banana' },
    ]);
  });

  it('should generate land codes from NewFarmerDto correctly', () => {
    const farmer: NewFarmerDto = {
      name: 'John',
      email: 'john@example.com',
      lastName: 'Doe',
      lands: [
        { location: 'North', name: 'Farm1' },
        { location: 'South', name: 'Farm2' },
      ],
    };
    const landCodes = prismaService.landCodeDto(farmer);

    expect(landCodes).toEqual(['North_Farm1', 'South_Farm2']);
  });

  it('should generate land codes from FarmerEntity correctly', () => {
    const farmer: FarmerEntity = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      lastName: 'Doe',
      lands: [
        { location: 'North', name: 'Farm1', id: 1 },
        { location: 'South', name: 'Farm2', id: 2 },
      ],
    };
    const landCodes = prismaService.landCodeEntity(farmer);

    expect(landCodes).toEqual(['North_Farm1', 'South_Farm2']);
  });
});
