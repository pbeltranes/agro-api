import { Test, TestingModule } from '@nestjs/testing';
import { FruitEntity } from 'entities/fruit.entity';
import { PrismaModule } from 'providers/prisma/prisma.module';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FruitController } from './fruit.controller';
import { FruitService } from './fruit.service';

describe('FruitsController', () => {
  let controller: FruitController;
  let service: FruitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FruitController],
      providers: [FruitService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<FruitController>(FruitController);
    service = module.get<FruitService>(FruitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create', async () => {
    const response: FruitEntity = {
      id: 1,
      name: 'string',
      varieties: [
        {
          id: 1,
          name: 'string',
          fruitId: 1,
        },
      ],
    };
    const input = { name: 'string', varieties: ['string'] };

    vi.spyOn(service, 'create').mockImplementation(async () => {
      return Promise.resolve(response);
    });
    expect(await controller.create(input)).toStrictEqual(response);
  });
});
