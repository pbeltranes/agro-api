import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewFarmer = extendApi(
  z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  }),
  {
    title: 'Fruit',
    description: 'A Fruit',
  },
);
export class NewFarmerDto extends createZodDto(NewFarmer) {}
