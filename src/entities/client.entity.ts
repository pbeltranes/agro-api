import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  //   @ApiProperty()
  //   published: boolean;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}
