import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertasService } from './alertas.service';
import { AlertasController } from './alertas.controller';
import { Alerta } from './entities/alerta.entity';
import { Producto } from '../productos/entities/producto.entity';  // Relación con Producto
import { Almacen } from '../almacenes/entities/almacen.entity';  // Relación con Almacen

@Module({
  imports: [
    TypeOrmModule.forFeature([Alerta, Producto, Almacen]),  // Añade las entidades necesarias
  ],
  controllers: [AlertasController],
  providers: [AlertasService],
})
export class AlertasModule {}
