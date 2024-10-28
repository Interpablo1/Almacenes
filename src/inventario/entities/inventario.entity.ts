import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';  // Importamos la entidad Producto
import { Almacen } from '../../almacenes/entities/almacen.entity';  // Importamos la entidad Almacen

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @ManyToOne(() => Producto, producto => producto.id_producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Almacen, almacen => almacen.id_almacen)
  @JoinColumn({ name: 'id_almacen' })
  almacen: Almacen;

  @Column({ type: 'int' })
  stock_actual: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
}
