import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';  // Relación con Producto
import { Almacen } from '../../almacenes/entities/almacen.entity';  // Relación con Almacen

@Entity('transacciones_inventario')
export class TransaccionInventario {
  @PrimaryGeneratedColumn()
  id_transaccion: number;

  @ManyToOne(() => Producto, producto => producto.id_producto)  // Relación con Producto
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Almacen, almacen => almacen.id_almacen)  // Relación con Almacen
  @JoinColumn({ name: 'id_almacen' })
  almacen: Almacen;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({
    type: 'enum',
    enum: ['Entrada', 'Salida'],
  })
  tipo_transaccion: 'Entrada' | 'Salida';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_transaccion: Date;

  @Column({ type: 'varchar', length: 255 })
  usuario_responsable: string;
}
