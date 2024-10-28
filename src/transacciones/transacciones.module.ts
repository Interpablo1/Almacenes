import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { TransaccionInventario } from './entities/transaccion.entity';
import { Producto } from '../productos/entities/producto.entity';  // Relación con Producto
import { Almacen } from '../almacenes/entities/almacen.entity';  // Relación con Almacen

@Module({
  imports: [
    TypeOrmModule.forFeature([TransaccionInventario, Producto, Almacen]),  // Añade las entidades necesarias
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
})
export class TransaccionesModule {}
