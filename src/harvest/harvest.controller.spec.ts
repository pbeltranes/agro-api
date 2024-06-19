import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'providers/prisma/prisma.module';
import { beforeEach, describe, expect, it } from 'vitest';

import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
  let controller: HarvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [HarvestService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
