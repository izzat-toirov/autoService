import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\+998\d{9}$/, { message: 'Telefon raqam formati noto‘g‘ri' })
  phone?: string;

  @ApiProperty({ example: 'ali@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Parol123!' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Parol123!' })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({ example: 'USER', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
