import { ApiProperty } from '@nestjs/swagger';
import { Fruit } from '@prisma/client';

export class FruitEntity implements Fruit {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  varieties?: {
    id: number;
    name: string;
    fruitId: number;
    // published: boolean;
    // createdAt: Date;
    // updatedAt: Date;
  }[];
  // @ApiProperty()
  // fruitId: number | null;

  // @ApiProperty()
  // farmerId: number;

  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
