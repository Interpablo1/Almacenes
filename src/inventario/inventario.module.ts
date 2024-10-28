import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario } from './entities/inventario.entity';
import { Producto } from '../productos/entities/producto.entity';  
import { Almacen } from '../almacenes/entities/almacen.entity';  
import { ProductosModule } from '../productos/productos.module';  
import { AlmacenesModule } from '../almacenes/almacenes.module';  

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario, Producto, Almacen]),  
    ProductosModule,  
    AlmacenesModule,  
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}
