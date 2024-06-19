import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'providers/prisma/prisma.module';
import { PrismaService } from 'providers/prisma/prisma.service';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { FarmerService } from './farmer.service';

describe('FarmerService', () => {
  let service: FarmerService;
  let prismaServiceMock: {
    farmer: {
      create: Mock<any, any>;
      findUnique: Mock<any, any>;
    };
    land: {
      createManyAndReturn: Mock<any, any>;
    };
    landCodeDto: Mock<any, any>;
    landCodeEntity: Mock<any, any>;
  };
  beforeEach(async () => {
    prismaServiceMock = {
      farmer: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
      land: {
        createManyAndReturn: vi.fn(),
      },
      landCodeDto: vi.fn(),
      landCodeEntity: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
      imports: [PrismaModule],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const createFarmer = {
      id: 1,
      name: 'string',
      lastName: 'string',
      email: 'string',
      lands: [
        {
          id: 1,
          location: 'string',
          name: 'string',
        },
      ],
    };
    prismaServiceMock.farmer.findUnique.mockResolvedValue(null);
    prismaServiceMock.farmer.create.mockResolvedValue(createFarmer);
    const response = await service.create({
      name: 'string',
      lastName: 'string',
      email: 'string',
      lands: [
        {
          location: 'string',
          name: 'string',
        },
      ],
    });
    expect(response).toEqual(createFarmer);
  });
  // it('should add varieties', async () => {
  //   const createFarmer = {
  //     id: 1,
  //     name: 'string',
  //     lastName: 'string',
  //     email: 'string',
  //     lands: [
  //       {
  //         id: 1,
  //         location: 'string',
  //         name: 'string',
  //       },
  //     ],
  //   };
  //   prismaServiceMock.farmer.findUnique.mockResolvedValue(createFarmer);
  //   prismaServiceMock.land.createManyAndReturn.mockResolvedValue([
  //     { id: 2, farmerId: 1, location: 'location', name: 'string2' },
  //   ]);
  //   prismaServiceMock.landCodeDto(['string_string']);
  //   prismaServiceMock.landCodeEntity(['string_string']);
  //   const response = await service.create({
  //     name: 'string',
  //     lastName: 'string',
  //     email: 'string',
  //     lands: [{ location: 'location', name: 'string' }],
  //   });
  //   expect(response).toEqual(createFarmer);
  // });
});
