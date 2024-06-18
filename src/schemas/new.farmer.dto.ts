import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewLand = extendApi(
  z.object({
    name: z.string(),
    location: z.string(),
  }),
);
export const NewFarmer = extendApi(
  z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    lands: z.array(NewLand),
  }),
  {
    title: 'Fruit',
    description: 'A Fruit',
  },
);

export class NewLandDto extends createZodDto(NewLand) {}
export class NewFarmerDto extends createZodDto(NewFarmer) {}
