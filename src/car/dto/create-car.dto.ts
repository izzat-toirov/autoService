import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    example: 90234,
    description: 'Davlat raqami (raqam ko‘rinishida)',
  })
  plate_number: number;

  @ApiProperty({
    example: '12345678901234567',
    description: 'VIN raqam (raqam ko‘rinishida)',
  })
  vin_number: number;

  @ApiProperty({
    example: 'Chevrolet Malibu',
    description: 'Mashina modeli',
  })
  model: string;

  @ApiProperty({
    example: '2020',
    description: 'Mashina chiqarilgan yili',
  })
  year: string;

  @ApiProperty({
    example: 5,
    description: 'Hozirgi egasining foydalanuvchi ID raqami',
  })
  current_owner_id: number;
}
