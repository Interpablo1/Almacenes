import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('almacenes')
export class Almacen {
  @PrimaryGeneratedColumn()
  id_almacen: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_almacen: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 20 })
  telefono_contacto: string;
}
