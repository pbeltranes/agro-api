import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import {
  CLIENT_LAST_NAME,
  CLIENT_MAIL,
  CLIENT_NAME,
  FARMER_LAST_NAME,
  FARMER_MAIL,
  FARMER_NAME,
  FRUIT_NAME,
  FRUIT_VARIETY,
  LAND_LOCATION,
  LAND_NAME,
} from '../constants';

export const Row = extendApi(
  z.object({
    [FARMER_MAIL]: z.string().min(1),
    [FARMER_NAME]: z.string().min(1),
    [FARMER_LAST_NAME]: z.string().min(1),
    [LAND_NAME]: z.string().min(1),
    [LAND_LOCATION]: z.string().min(1),
    [FRUIT_NAME]: z.string().min(1),
    [CLIENT_NAME]: z.string().min(1),
    [FRUIT_VARIETY]: z.string().min(1),
    [CLIENT_LAST_NAME]: z.string().min(1),
    [CLIENT_MAIL]: z.string().min(1),
  }),
  {
    title: 'Row Data',
    description: 'A Row Data',
  },
);

export class RowDto extends createZodDto(Row) {}
