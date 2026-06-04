import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Plan } from '../planes/plan.entity';

@Entity('socios')
export class Socio {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Plan, (plan) => plan.socios, { eager: true, onDelete: 'RESTRICT' })
  plan?: Plan;

  @Column()
  nombre?: string;

  @Column({ unique: true })
  cedula?: string;

  @Column({ default: 0 })
  dias_atraso?: number;

  @Column({ default: true })
  activo?: boolean;

  @CreateDateColumn()
  creado_en?: Date;
}