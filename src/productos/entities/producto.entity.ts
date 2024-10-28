import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_producto: string;

  @Column({ type: 'varchar', length: 50 })
  codigo_barras: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @Column({ type: 'int' })
  stock_actual: number;

  @Column({ type: 'int' })
  stock_minimo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;
}
