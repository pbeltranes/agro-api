import { ApiProperty } from '@nestjs/swagger';
import { Farmer } from '@prisma/client';

export class FarmerEntity implements Farmer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  lands?: {
    id: number;
    name: string;
    location: string;
  }[];

  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
