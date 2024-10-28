import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';  // Importamos la entidad Proveedor
import { Producto } from '../../productos/entities/producto.entity';  // Importamos la entidad Producto

@Entity('ordenes_reabastecimiento')
export class OrdenReabastecimiento {
  @PrimaryGeneratedColumn()
  id_orden: number;

  @ManyToOne(() => Proveedor, proveedor => proveedor.id_proveedor)  // Relación con Proveedores
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @ManyToOne(() => Producto, producto => producto.id_producto)  // Relación con Productos
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad_ordenada: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_orden: Date;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'Completada', 'Cancelada'],
    default: 'Pendiente',
  })
  estado_orden: 'Pendiente' | 'Completada' | 'Cancelada';
}
