import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { full_name, phone, email, password, confirm_password } = createUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const active_link = uuidv4();

    return this.prismaService.user.create({
      data: {
        full_name,
        phone,
        email,
        hashedPassword,
        active_link,
        role: 'USER',
        is_active: false,
        is_approved: false,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({where: {id}});
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.prismaService.user.update({where: {id}, data: updateUserDto});
  // }

  remove(id: number) {
    return this.prismaService.user.delete({where: {id}});
  }

  async findUserByEmail(email: string, id: number) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
  
  async uptadeRefreshToken(id: number, refreshToken: string) {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { hashedRefreshToken: refreshToken },
    });
  
    return updatedUser;
  }
}
