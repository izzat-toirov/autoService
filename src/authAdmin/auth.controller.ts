import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

import { AdminAuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInAdminDto } from '../admin/dto/signIn.dto';

@ApiTags('Admin Auth')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @HttpCode(201)
  @Post('sign-up')
  @ApiOperation({ summary: 'Admin ro‘yxatdan o‘tishi' })
  @ApiResponse({ status: 201, description: 'Admin yaratildi' })
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUp(createAdminDto);
  }

  @HttpCode(200)
  @Post('sign-in')
  @ApiOperation({ summary: 'Admin tizimga kiradi' })
  @ApiResponse({ status: 200, description: 'Kirish muvaffaqiyatli' })
  async signIn(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInAdminDto, res);
  }

  @HttpCode(200)
  @Post('sign-out')
  @ApiOperation({ summary: 'Admin tizimdan chiqadi' })
  async signOut(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post('refresh/:id')
  @ApiOperation({ summary: 'Token yangilash (refresh)' })
  async refreshToken(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(refreshToken, res);
  }
}
