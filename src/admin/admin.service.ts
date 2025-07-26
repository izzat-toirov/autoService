import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { full_name, phone, email, is_creator = false } = createAdminDto;
  
    return this.prismaService.admin.create({
      data: {
        full_name,
        phone,
        email,
        is_creator
      },
    });
  }
  

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({where: {id}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({where: {id}, data: updateAdminDto});
  }

  remove(id: number) {
    return this.prismaService.admin.delete({where: {id}});
  }

  async findadminByEmail(email: string, id: number) {
    return await this.prismaService.admin.findUnique({ where: { email } });
  }
  
}
