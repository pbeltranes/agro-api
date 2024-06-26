import { ApiProperty } from '@nestjs/swagger';
import { Variety } from '@prisma/client';

export class VarietyEntity implements Variety {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  fruitId: number | null;

  @ApiProperty()
  farmerId: number;

  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
