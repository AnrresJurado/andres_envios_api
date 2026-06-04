import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { Socio } from './socio.entity';
import { Plan } from '../planes/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Socio, Plan])],
  controllers: [SociosController],
  providers: [SociosService],
})
export class SociosModule {}