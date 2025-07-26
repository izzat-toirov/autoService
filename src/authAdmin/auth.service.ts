import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Admin } from '../../generated/prisma';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from '../admin/dto/signIn.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      role: 'ADMIN',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUp(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;
    const existing = await this.prisma.admin.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException('Admin allaqachon mavjud');
    }

    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        is_creator: false, // yoki DTOda kelsa, shunga mos yozing
      },
    });
  }

  async signIn(signInDto: SignInAdminDto, res: Response) {
    const { email } = signInDto;
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Bunday admin mavjud emas');
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      message: 'Admin tizimga kirdi',
      adminId: admin.id,
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    res.clearCookie('refreshToken');
    return { message: 'Admin tizimdan chiqdi' };
  }

  async refreshToken(refreshTokenFromCookie: string, res: Response) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(refreshTokenFromCookie, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      throw new BadRequestException('Noto‘g‘ri token');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: decoded.id },
    });

    if (!admin) throw new NotAcceptableException('Admin topilmadi');

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      message: 'Token yangilandi',
      adminId: admin.id,
      accessToken,
    };
  }
}
