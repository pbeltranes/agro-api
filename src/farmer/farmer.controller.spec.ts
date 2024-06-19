import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'providers/prisma/prisma.module';
import { beforeEach, describe, expect, it } from 'vitest';

import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

describe('FarmerController', () => {
  let controller: FarmerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      imports: [PrismaModule],
      providers: [FarmerService],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
