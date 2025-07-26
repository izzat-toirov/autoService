import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiyev', description: "To'liq ism" })
  full_name: string;

  @ApiProperty({ example: '+998901234567', required: false })
  phone?: string;

  @ApiProperty({ example: 'ali@example.com', description: "Email manzil" })
  email: string;

  @ApiProperty({ example: true, description: 'Super adminmi?', default: false })
  is_creator?: boolean;
}
