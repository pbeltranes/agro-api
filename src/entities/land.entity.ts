import { ApiProperty } from '@nestjs/swagger';
import { Land } from '@prisma/client';

export class LandEntity implements Land {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  location: string | null;

  @ApiProperty()
  farmerId: number;

  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
