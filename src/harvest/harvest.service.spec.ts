import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HarvestService } from './harvest.service';
describe('HarvestService', () => {
  let service: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvestService],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
