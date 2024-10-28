import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionInventario } from './entities/transaccion.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(TransaccionInventario)
    private readonly transaccionRepository: Repository<TransaccionInventario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
  ) {}

  findAll(): Promise<TransaccionInventario[]> {
    return this.transaccionRepository.find({ relations: ['producto', 'almacen'] });
  }

  async findOne(id: number): Promise<TransaccionInventario> {
    const transaccion = await this.transaccionRepository.findOne({ where: { id_transaccion: id }, relations: ['producto', 'almacen'] });
    if (!transaccion) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }
    return transaccion;
  }

  async create(createTransaccionDto: CreateTransaccionDto): Promise<TransaccionInventario> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: createTransaccionDto.id_producto } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createTransaccionDto.id_producto} no encontrado`);
    }

    const almacen = await this.almacenRepository.findOne({ where: { id_almacen: createTransaccionDto.id_almacen } });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${createTransaccionDto.id_almacen} no encontrado`);
    }

    const transaccion = this.transaccionRepository.create({
      ...createTransaccionDto,
      producto,
      almacen,
    });

    return this.transaccionRepository.save(transaccion);
  }

  async update(id: number, updateTransaccionDto: UpdateTransaccionDto): Promise<TransaccionInventario> {
    await this.transaccionRepository.update(id, updateTransaccionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.transaccionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }
  }
}
