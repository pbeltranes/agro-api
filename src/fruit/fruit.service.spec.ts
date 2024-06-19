import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'providers/prisma/prisma.service';
import { describe, beforeEach, it, expect, vi, Mock } from 'vitest';

import { FruitService } from './fruit.service';

describe('FruitsService', () => {
  let service: FruitService;
  let prismaServiceMock: {
    fruit: {
      create: Mock<any, any>;
      findFirst: Mock<any, any>;
      update: Mock<any, any>;
      findUnique: Mock<any, any>;
    };
    variety: {
      createManyAndReturn: Mock<any, any>;
    };
    formatVarieties: Mock<any, any>;
  };
  beforeEach(async () => {
    prismaServiceMock = {
      fruit: {
        create: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
        findUnique: vi.fn(),
      },
      variety: {
        createManyAndReturn: vi.fn(),
      },
      formatVarieties: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FruitService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<FruitService>(FruitService);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create', async () => {
      prismaServiceMock.fruit.findUnique.mockResolvedValue(null);
      // prismaServiceMock.fruit.findUnique.mockResolvedValue(null);
      prismaServiceMock.fruit.create.mockResolvedValue({
        id: 1,
        name: 'string',
        varieties: ['string'],
      });
      const response = await service.create({
        name: 'string',
        varieties: ['string'],
      });
      expect(response).toEqual({
        id: 1,
        name: 'string',
        varieties: ['string'],
      });
    });

    it('should add varieties', async () => {
      prismaServiceMock.fruit.findUnique.mockResolvedValue({
        id: 1,
        name: 'string',
        varieties: ['string'],
      });
      prismaServiceMock.variety.createManyAndReturn.mockResolvedValue([
        { fruitId: 1, name: 'string2' },
      ]);

      const response = await service.create({
        name: 'string',
        varieties: ['string'],
      });
      expect(response).toEqual({
        id: 1,
        name: 'string',
        varieties: [{ fruitId: 1, name: 'string2' }],
      });
    });
  });
});
