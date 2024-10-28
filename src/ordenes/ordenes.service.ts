import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenReabastecimiento } from './entities/orden.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(OrdenReabastecimiento)
    private readonly ordenRepository: Repository<OrdenReabastecimiento>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<OrdenReabastecimiento[]> {
    return this.ordenRepository.find({ relations: ['proveedor', 'producto'] });
  }

  async findOne(id: number): Promise<OrdenReabastecimiento> {
    const orden = await this.ordenRepository.findOne({ where: { id_orden: id }, relations: ['proveedor', 'producto'] });
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return orden;
  }

  async create(createOrdenDto: CreateOrdenDto): Promise<OrdenReabastecimiento> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: createOrdenDto.id_proveedor } });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${createOrdenDto.id_proveedor} no encontrado`);
    }

    const producto = await this.productoRepository.findOne({ where: { id_producto: createOrdenDto.id_producto } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createOrdenDto.id_producto} no encontrado`);
    }

    const orden = this.ordenRepository.create({
      ...createOrdenDto,
      proveedor,
      producto,
    });

    return this.ordenRepository.save(orden);
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<OrdenReabastecimiento> {
    await this.ordenRepository.update(id, updateOrdenDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ordenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
  }
}
