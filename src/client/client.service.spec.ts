import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'providers/prisma/prisma.service';
import { describe, beforeEach, it, expect } from 'vitest';

import { ClientService } from './client.service';

describe('FruitsService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, PrismaService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
