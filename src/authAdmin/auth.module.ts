import { Module } from '@nestjs/common';

import { AdminAuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

import { AdminAuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports:[JwtModule.register({}), PrismaModule, AdminModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports:[AdminAuthService]
})
export class AdminAuthModule {}
