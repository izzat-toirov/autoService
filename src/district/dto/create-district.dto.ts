import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  region_id: number;
}
