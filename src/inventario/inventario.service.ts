import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Producto } from '../productos/entities/producto.entity';
import { Almacen } from '../almacenes/entities/almacen.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
  ) {}

  findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find({ relations: ['producto', 'almacen'] });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario: id }, relations: ['producto', 'almacen'] });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventario;
  }

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    // Buscar producto y almacén por sus IDs
    const producto = await this.productoRepository.findOne({ where: { id_producto: createInventarioDto.id_producto } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createInventarioDto.id_producto} no encontrado`);
    }

    const almacen = await this.almacenRepository.findOne({ where: { id_almacen: createInventarioDto.id_almacen } });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${createInventarioDto.id_almacen} no encontrado`);
    }

    // Crear y asignar las relaciones manualmente
    const inventario = this.inventarioRepository.create({
      ...createInventarioDto,
      producto,
      almacen,
    });

    return this.inventarioRepository.save(inventario);
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
    await this.inventarioRepository.update(id, updateInventarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.inventarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
  }
}
