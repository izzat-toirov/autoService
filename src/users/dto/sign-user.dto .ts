import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'ali@example.com' })
  email: string;
  @ApiProperty({ example: 'Parol123!' })
  password: string;
}
