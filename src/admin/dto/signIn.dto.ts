import { ApiProperty } from '@nestjs/swagger';

export class SignInAdminDto {
  @ApiProperty({ example: 'admin@example.com' })
  email: string;
}
