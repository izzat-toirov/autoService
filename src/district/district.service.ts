import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) {}
  
    async create(createDistrictDto: CreateDistrictDto) {
      const { name, region_id } = createDistrictDto;
  
      return this.prismaService.district.create({
        data: { name, region_id },
      });
    }
  
    findAll() {
      return this.prismaService.district.findMany();
    }
  
    findOne(id: number) {
      return this.prismaService.district.findUnique({ where: { id } });
    }
  
    update(id: number, updateDistrictDto: UpdateDistrictDto) {
      return this.prismaService.district.update({
        where: { id },
        data: updateDistrictDto,
      });
    }
  
    remove(id: number) {
      return this.prismaService.district.delete({ where: { id } });
    }
}
