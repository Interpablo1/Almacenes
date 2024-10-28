import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';  // Relación con Producto
import { Almacen } from '../../almacenes/entities/almacen.entity';  // Relación con Almacen

@Entity('alertas')
export class Alerta {
  @PrimaryGeneratedColumn()
  id_alerta: number;

  @ManyToOne(() => Producto, producto => producto.id_producto)  // Relación con Producto
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Almacen, almacen => almacen.id_almacen)  // Relación con Almacen
  @JoinColumn({ name: 'id_almacen' })
  almacen: Almacen;

  @Column({
    type: 'enum',
    enum: ['Stock Bajo', 'Stock Crítico'],
  })
  tipo_alerta: 'Stock Bajo' | 'Stock Crítico';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_alerta: Date;

  @Column({
    type: 'enum',
    enum: ['Activa', 'Resuelta'],
    default: 'Activa',
  })
  estado_alerta: 'Activa' | 'Resuelta';
}
