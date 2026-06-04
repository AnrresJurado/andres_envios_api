import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Socio } from '../socios/socio.entity';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  nombre?: string;

  @Column('decimal', { precision: 8, scale: 2 })
  precio?: number;

  @Column({ default: true })
  activo?: boolean;

  @OneToMany(() => Socio, (socio) => socio.plan)
  socios?: Socio[];
}