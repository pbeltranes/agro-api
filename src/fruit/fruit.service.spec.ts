import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'providers/prisma/prisma.service';
import { describe, beforeEach, it, expect } from 'vitest';

import { FruitService } from './fruit.service';

describe('FruitsService', () => {
  let service: FruitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FruitService, PrismaService],
    }).compile();

    service = module.get<FruitService>(FruitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
