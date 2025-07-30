import { Injectable } from '@nestjs/common';
import { CreateCarHistoryDto } from './dto/create-car_history.dto';
import { UpdateCarHistoryDto } from './dto/update-car_history.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarHistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCarHistoryDto: CreateCarHistoryDto) {
    const { car_id, owner_id, buyed_at, sold_at } =
      createCarHistoryDto;

    return this.prismaService.car_History.create({
      data: { car_id, owner_id, buyed_at, sold_at },
    });
  }

  findAll() {
    return this.prismaService.car_History.findMany();
  }

  findOne(id: number) {
    return this.prismaService.car_History.findUnique({ where: { id } });
  }

  update(id: number, updateCarHistoryDto: UpdateCarHistoryDto) {
    return this.prismaService.car_History.update({ where: { id }, data: updateCarHistoryDto });
  }

  remove(id: number) {
    return this.prismaService.car_History.delete({ where: { id } });
  }
}
