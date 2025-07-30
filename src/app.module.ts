import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './authAdmin/auth.module';
import { CarModule } from './car/car.module';
import { CarHistoryModule } from './car_history/car_history.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictModule } from './district/district.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    AdminModule,
    AdminAuthModule,
    CarModule,
    CarHistoryModule,
    RegionsModule,
    DistrictModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
