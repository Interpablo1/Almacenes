import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Controller('almacenes')
export class AlmacenesController {
  constructor(private readonly almacenesService: AlmacenesService) {}

  @Get()
  findAll() {
    return this.almacenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.almacenesService.findOne(+id);
  }

  @Post()
  create(@Body() createAlmacenDto: CreateAlmacenDto) {
    return this.almacenesService.create(createAlmacenDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlmacenDto: UpdateAlmacenDto) {
    return this.almacenesService.update(+id, updateAlmacenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.almacenesService.remove(+id);
  }
}
