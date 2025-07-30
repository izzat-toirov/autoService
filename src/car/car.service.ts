import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    const { plate_number, vin_number, model, year, current_owner_id } = createCarDto;


    return this.prismaService.car.create({
      data: {plate_number, vin_number, model, year, current_owner_id},
    });
  }

  findAll() {
    return this.prismaService.car.findMany();
  }

  findOne(id: number) {
    return this.prismaService.car.findUnique({where: {id}});
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prismaService.car.update({where: {id}, data: updateCarDto});
  }

  remove(id: number) {
    return this.prismaService.car.delete({where: {id}});
  }
}
