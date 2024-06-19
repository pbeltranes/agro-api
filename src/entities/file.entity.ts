import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileEntity {
  @ApiProperty()
  farmerMail: string;
  @ApiProperty()
  farmerName: string;
  @ApiProperty()
  farmerLastName: string;
  @ApiProperty()
  landName: string;
  @ApiProperty()
  landLocation: string;
  @ApiProperty()
  fruitName: string;
  @ApiProperty()
  fruitVariety: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  clientLastName: string;
  @ApiProperty()
  clientMail: string;
}
