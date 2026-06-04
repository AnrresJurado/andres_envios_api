import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  create(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan);
  }

  findAll() {
    return this.planRepository.find({ relations: { socios: true } });
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOne({ where: { id }, relations: { socios: true } });
    if (!plan) throw new NotFoundException('Plan no encontrado');
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOne(id);
    Object.assign(plan, updatePlanDto);
    return this.planRepository.save(plan);
  }

  async remove(id: string) {
    const plan = await this.planRepository.findOne({ where: { id }, relations: { socios: true } });
    if (!plan) throw new NotFoundException('Plan no encontrado');
    if (plan.socios && plan.socios.length > 0)
      throw new BadRequestException('No se puede eliminar un plan con socios activos');
    return this.planRepository.remove(plan);
  }
}