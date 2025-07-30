import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    const { name } = createRegionDto;

    return this.prismaService.regions.create({
      data: { name },
    });
  }

  findAll() {
    return this.prismaService.regions.findMany();
  }

  findOne(id: number) {
    return this.prismaService.regions.findUnique({ where: { id } });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.prismaService.regions.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  remove(id: number) {
    return this.prismaService.regions.delete({ where: { id } });
  }
}
