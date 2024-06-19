import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewRowCSV = extendApi(
  z.object({
    farmerMail: z.string(),
    farmerName: z.string(),
    farmerLastName: z.string(),
    landName: z.string(),
    landLocation: z.string(),
    fruitName: z.string(),
    fruitVariety: z.string(),
    clientName: z.string(),
    clientLastName: z.string(),
    clientMail: z.string(),
  }),
  {
    title: 'Row',
    description: 'A Row',
  },
);
export class NewRowCSVDto extends createZodDto(NewRowCSV) {}
