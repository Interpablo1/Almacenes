import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from './entities/almacen.entity';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Injectable()
export class AlmacenesService {
  constructor(
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
  ) {}

  findAll(): Promise<Almacen[]> {
    return this.almacenRepository.find();
  }

  async findOne(id: number): Promise<Almacen> {
    const almacen = await this.almacenRepository.findOne({ where: { id_almacen: id } });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }
    return almacen;
  }

  create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
    const almacen = this.almacenRepository.create(createAlmacenDto);
    return this.almacenRepository.save(almacen);
  }

  async update(id: number, updateAlmacenDto: UpdateAlmacenDto): Promise<Almacen> {
    await this.almacenRepository.update(id, updateAlmacenDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.almacenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }
  }
}
