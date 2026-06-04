import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from './socio.entity';
import { Plan } from '../planes/plan.entity';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Injectable()
export class SociosService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,

    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createSocioDto: CreateSocioDto) {
    const plan = await this.planRepository.findOne({ where: { id: createSocioDto.planId } });
    if (!plan) throw new NotFoundException('Plan no encontrado');

    const socio = this.socioRepository.create({
      nombre:      createSocioDto.nombre,
      cedula:      createSocioDto.cedula,
      dias_atraso: createSocioDto.dias_atraso ?? 0,
      activo:      createSocioDto.activo ?? true,
      plan,
    });
    return this.socioRepository.save(socio);
  }

  findAll() {
    return this.socioRepository.find();
  }

  async findOne(id: string) {
    const socio = await this.socioRepository.findOne({ where: { id } });
    if (!socio) throw new NotFoundException('Socio no encontrado');
    return socio;
  }

  async update(id: string, updateSocioDto: UpdateSocioDto) {
    const socio = await this.findOne(id);

    if (updateSocioDto.planId) {
      const plan = await this.planRepository.findOne({ where: { id: updateSocioDto.planId } });
      if (!plan) throw new NotFoundException('Plan no encontrado');
      socio.plan = plan;
    }

    Object.assign(socio, updateSocioDto);
    return this.socioRepository.save(socio);
  }

  async remove(id: string) {
    const socio = await this.findOne(id);
    return this.socioRepository.remove(socio);
  }
}