import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from './entities/alerta.entity';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';

@Injectable()
export class AlertasService {
  constructor(
    @InjectRepository(Alerta)
    private readonly alertaRepository: Repository<Alerta>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
  ) {}

  findAll(): Promise<Alerta[]> {
    return this.alertaRepository.find({ relations: ['producto', 'almacen'] });
  }

  async findOne(id: number): Promise<Alerta> {
    const alerta = await this.alertaRepository.findOne({ where: { id_alerta: id }, relations: ['producto', 'almacen'] });
    if (!alerta) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return alerta;
  }

  async create(createAlertaDto: CreateAlertaDto): Promise<Alerta> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: createAlertaDto.id_producto } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createAlertaDto.id_producto} no encontrado`);
    }

    const almacen = await this.almacenRepository.findOne({ where: { id_almacen: createAlertaDto.id_almacen } });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${createAlertaDto.id_almacen} no encontrado`);
    }

    const alerta = this.alertaRepository.create({
      ...createAlertaDto,
      producto,
      almacen,
    });

    return this.alertaRepository.save(alerta);
  }

  async update(id: number, updateAlertaDto: UpdateAlertaDto): Promise<Alerta> {
    await this.alertaRepository.update(id, updateAlertaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.alertaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
  }
}
