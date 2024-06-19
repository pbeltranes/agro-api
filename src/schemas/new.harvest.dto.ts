import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewHarvest = extendApi(
  z.object({
    varietyId: z.number(),
    clientId: z.number().optional(),
    landId: z.number(),
  }),
  {
    title: 'Harverst',
    description: 'A Harvest',
  },
);
export class NewHarvestDto extends createZodDto(NewHarvest) {}
