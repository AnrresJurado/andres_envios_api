import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CobrosDto } from './dto/cobros.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // POST /services/cobros
  @Post('cobros')
  cobros(@Body() cobrosDto: CobrosDto) {
    return this.servicesService.cobros(cobrosDto);
  }

  // GET /services/clases
  @Get('clases')
  clases(
    @Query('minutos_disponibles') minutos: string,
    @Query('duraciones') duraciones: string,
  ) {
    return this.servicesService.clases(parseInt(minutos, 10), duraciones);
  }
}