import { ApiProperty } from '@nestjs/swagger';
import { Harvest } from '@prisma/client';

export class HarvestEntity implements Harvest {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  // @ApiProperty()
  // lastName: string;

  @ApiProperty()
  varietyId: number;

  @ApiProperty()
  landId: number;

  @ApiProperty()
  clientId: number;
  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
