import { PartialType } from '@nestjs/swagger';
import { CreateCarHistoryDto } from './create-car_history.dto';

export class UpdateCarHistoryDto extends PartialType(CreateCarHistoryDto) {}
