import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewFruit = extendApi(
  z.object({
    name: z.string(),
    varieties: z.array(z.string()),
  }),
  {
    title: 'Fruit',
    description: 'A Fruit',
  },
);
export class NewFruitDto extends createZodDto(NewFruit) {}
