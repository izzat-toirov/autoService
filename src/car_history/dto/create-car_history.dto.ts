import { ApiProperty } from '@nestjs/swagger';

export class CreateCarHistoryDto {
  @ApiProperty({
    example: 1,
    description: 'Car ID – mashinaning noyob identifikatori',
  })
  car_id: number;

  @ApiProperty({
    example: 42,
    description: 'Owner ID – egasining foydalanuvchi identifikatori',
  })
  owner_id: number;

  @ApiProperty({
    example: '2023-01-15',
    description: 'Mashina sotib olingan sana (ISO formatda)',
  })
  buyed_at: string;

  @ApiProperty({
    example: '2024-07-15',
    description: 'Mashina sotilgan sana (ISO formatda)',
  })
  sold_at: string;
}
