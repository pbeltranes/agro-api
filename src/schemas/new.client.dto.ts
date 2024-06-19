import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const NewClient = extendApi(
  z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  }),
  {
    title: 'Client',
    description: 'A Client',
  },
);
export class NewClientDto extends createZodDto(NewClient) {}
