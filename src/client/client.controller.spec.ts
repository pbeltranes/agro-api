import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ClientController } from './client.controller';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
// const haverst = {
//   haverst: {
//     varierty: {
//       name: 'pequeño',
//       fruit: {
//         name: 'Mango',
//       },
//     },
//     land: {
//       name: 'Casa',
//       location: '1000',
//       farmer: {
//         name: 'Joaquin',
//         lastname: 'Carrillo',
//         email: 'joaquin.carrillo@mail.com',
//       },
//     },
//     client: {
//       name: 'Juan',
//       lastname: 'Perez',
//       email: 'juan.perexz@gmail.com',
//     },
//   },
//   date: '2021-07-01',
// };
