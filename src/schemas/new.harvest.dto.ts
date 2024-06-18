import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewHarvest = extendApi(
  z.object({
    varietyId: z.number(),
    clientId: z.string().optional(),
    landId: z.string(),
  }),
  {
    title: 'Fruit',
    description: 'A Fruit',
  },
);
export class NewHarvestDto extends createZodDto(NewHarvest) {}
