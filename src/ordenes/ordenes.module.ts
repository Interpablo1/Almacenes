import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { OrdenReabastecimiento } from './entities/orden.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';  // Importar la entidad Proveedor
import { Producto } from '../productos/entities/producto.entity';  // Importar la entidad Producto

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenReabastecimiento, Proveedor, Producto]),  // Añadir las entidades necesarias
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
